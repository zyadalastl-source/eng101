import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { key } = await req.json();

    if (!process.env.ADMIN_SECRET) {
      return NextResponse.json(
        { ok: false, message: "ADMIN_SECRET غير موجود على السيرفر" },
        { status: 500 }
      );
    }

    if (String(key || "").trim() !== String(process.env.ADMIN_SECRET).trim()) {
      return NextResponse.json({ ok: false, message: "مفتاح خاطئ" }, { status: 401 });
    }

    const res = NextResponse.json({ ok: true });

    // Cookie للأدمن
    res.cookies.set("admin_key", "1", {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30, // 30 يوم
    });

    return res;
  } catch {
    return NextResponse.json({ ok: false, message: "خطأ بالسيرفر" }, { status: 500 });
  }
}
