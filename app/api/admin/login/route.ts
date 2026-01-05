import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { key } = await req.json();
  const adminKey = process.env.ADMIN_KEY || "";

  if (!key || key !== adminKey) {
    return NextResponse.json({ message: "مفتاح الأدمن غير صحيح" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });

  // كوكي للأدمن
  res.cookies.set("admin_key", key, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // أسبوع
  });

  return res;
}
