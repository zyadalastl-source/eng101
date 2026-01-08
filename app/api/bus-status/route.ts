// app/api/bus-status/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // مهم
export const dynamic = "force-dynamic"; // حتى ما ينكش
export const revalidate = 0;

type Entry = { name: string; bus: string };

let cache: { ts: number; data: any } | null = null;

function stripTags(s: string) {
  return s
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTdText(html: string) {
  const out: string[] = [];
  const re = /<td[^>]*>([\s\S]*?)<\/td>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const text = stripTags(m[1]);
    if (text) out.push(text);
  }
  return out;
}

// محاولة فهم الجدول على شكل (اسم خط + رقم باص) متكرر
function looksLikeBus(x: string) {
  const v = x.trim();
  if (!v) return false;
  if (v === "-") return true;
  return /^[0-9]{1,4}$/.test(v);
}

function looksLikeName(x: string) {
  const v = x.trim();
  if (!v || v === "-") return false;
  // عربي أو نجمة أو شرطة ضمن الاسم
  return /[\u0600-\u06FF]/.test(v);
}

function parseEntriesFromHtml(html: string): Entry[] {
  const tds = extractTdText(html);

  // شيل العناوين
  const cleaned = tds.filter(
    (x) => x && x !== "اسم الخط" && x !== "رقم الباص"
  );

  const entries: Entry[] = [];

  for (let i = 0; i + 1 < cleaned.length; i++) {
    const a = cleaned[i]?.trim();
    const b = cleaned[i + 1]?.trim();

    // حالتين ممكن يصيروا حسب ترتيب الـ HTML:
    // 1) bus ثم name
    if (looksLikeBus(a) && looksLikeName(b)) {
      entries.push({ name: b, bus: a });
      i += 1;
      continue;
    }

    // 2) name ثم bus
    if (looksLikeName(a) && looksLikeBus(b)) {
      entries.push({ name: a, bus: b });
      i += 1;
      continue;
    }
  }

  // نظّف: شيل أي عنصر اسمه مش اسم
  const unique = new Map<string, Entry>();
  for (const e of entries) {
    const key = e.name.trim();
    if (!looksLikeName(key)) continue;
    if (!unique.has(key)) unique.set(key, e);
  }

  return Array.from(unique.values());
}


// fallback: لو الموقع رجّع نص بدون td (أو تغيّر الهيكل)
function parseEntriesFromText(text: string): Entry[] {
  // صعب 100% بدون معرفة الهيكل، فبنكتفي بإرجاع فاضي
  // (وغالباً الـ td parser رح ينجح بالموقع الحقيقي)
  return [];
}

function parseRoundTime(text: string) {
  // مثال: "موعد الجولة 4:15"
  const m = text.match(/موعد\s*الجولة\s*([0-9]{1,2}:[0-9]{2})/);
  return m?.[1] ?? null;
}

export async function GET() {
  // cache بسيط: حتى لو زار الصفحة 100 شخص، ما نضرب الموقع الرسمي كل ثانية
  const now = Date.now();
  if (cache && now - cache.ts < 5_000) {
    return NextResponse.json(cache.data);
  }

  const url = "https://meubus.meu.edu.jo/";

  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      "Accept": "text/html,*/*",
    },
    // مهم: لا تخلي Next يعمل cache خارجي
    cache: "no-store",
  });

  if (!res.ok) {
    return NextResponse.json(
      { ok: false, error: "upstream_failed", status: res.status },
      { status: 502 }
    );
  }

  const html = await res.text();
  const plain = stripTags(html);
  const roundTime = parseRoundTime(plain);

  let entries = parseEntriesFromHtml(html);
  if (!entries.length) {
    entries = parseEntriesFromText(plain);
  }

  const data = {
    ok: true,
    fetchedAt: new Date().toISOString(),
    roundTime,
    entries, // [{name,bus}]
  };

  cache = { ts: now, data };
  return NextResponse.json(data);
}
