import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const key = String(body?.key || "").trim();

  if (!process.env.ADMIN_KEY) {
    return NextResponse.json({ ok: false, message: "ADMIN_KEY غير موجود" }, { status: 500 });
  }

  if (key !== process.env.ADMIN_KEY) {
    return NextResponse.json({ ok: false, message: "مفتاح خاطئ" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });

  res.cookies.set("admin_key", key, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return res;
}
