import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

function isAdmin(req: Request) {
  const adminSecret = (process.env.ADMIN_SECRET || process.env.ADMIN_KEY || "").trim();

  // 1) Header (الأفضل – بيشتغل على أي دومين)
  const headerKey =
    (req.headers.get("x-admin-key") || "").trim() ||
    (req.headers.get("X-Admin-Key") || "").trim() ||
    (req.headers.get("authorization") || "").replace("Bearer ", "").trim();

  // 2) Cookie (اختياري – إذا موجود)
  const cookieKey = (cookies().get("admin_key")?.value || "").trim();

  return !!adminSecret && (headerKey === adminSecret || cookieKey === adminSecret);
}

// ✅ GET: جلب كل المواد للأدمن
export async function GET(req: Request) {
  if (!isAdmin(req)) {
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
  if (!isAdmin(req)) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));

  const course_code = String(body.course_code || "").trim();
  const type = String(body.type || "").trim(); // slides / summary / exam
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
  if (!isAdmin(req)) {
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
