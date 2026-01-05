import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

// ✅ يتحقق من: Header أو Cookie أو (Body للـ POST)
async function isAdmin(req: Request) {
  const adminSecret = (process.env.ADMIN_SECRET || process.env.ADMIN_KEY || "").trim();

  const headerKey =
    (req.headers.get("x-admin-key") || "").trim() ||
    (req.headers.get("authorization") || "").replace("Bearer ", "").trim();

  const cookieKey = (cookies().get("admin_key")?.value || "").trim();

  // Body key للـ POST فقط
  let bodyKey = "";
  try {
    const clone = req.clone();
    const body = await clone.json();
    bodyKey = String(body?.admin_key || "").trim();
  } catch {}

  return !!adminSecret && (headerKey === adminSecret || cookieKey === adminSecret || bodyKey === adminSecret);
}

// ✅ GET: جلب كل المواد للأدمن
export async function GET(req: Request) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("materials")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, rows: data || [] });
}

// ✅ POST: إضافة رابط
export async function POST(req: Request) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));

  const course_code = String(body.course_code || "").trim();
  const type = String(body.type || "").trim();
  const title = String(body.title || "").trim();
  const year = body.year === null || body.year === undefined ? null : Number(body.year);
  const url = String(body.url || "").trim();

  if (!course_code || !type || !title || !url) {
    return NextResponse.json(
      { ok: false, message: "بيانات ناقصة (course_code/type/title/url)" },
      { status: 400 }
    );
  }

  const { error } = await supabaseAdmin.from("materials").insert({
    course_code,
    type,
    title,
    year: Number.isFinite(year as number) ? (year as number) : null,
    url,
  });

  if (error) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

// ✅ DELETE: حذف صف
export async function DELETE(req: Request) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = String(searchParams.get("id") || "").trim();

  if (!id) {
    return NextResponse.json({ ok: false, message: "Missing id" }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from("materials").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
