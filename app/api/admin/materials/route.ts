import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

function isAdmin(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  return cookie.includes("admin_key=");
}

// إضافة
export async function POST(req: Request) {
  try {
    if (!isAdmin(req)) {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const { course_code, type, title, year, url } = body;

    const { error } = await supabaseAdmin.from("materials").insert({
      course_code,
      type,
      title,
      year: year ?? null,
      url,
    });

    if (error) {
      return NextResponse.json({ ok: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}

// حذف
export async function DELETE(req: Request) {
  try {
    if (!isAdmin(req)) {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ ok: false, message: "Missing id" }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from("materials").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ ok: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}
