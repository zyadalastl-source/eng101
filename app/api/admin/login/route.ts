import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { key } = await req.json();

  const ADMIN_SECRET = process.env.ADMIN_SECRET || "";

  if (!ADMIN_SECRET) {
    return NextResponse.json(
      { ok: false, message: "Missing ADMIN_SECRET on server" },
      { status: 500 }
    );
  }

  if (key !== ADMIN_SECRET) {
    return NextResponse.json(
      { ok: false, message: "Invalid admin key" },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ ok: true });

  // ✅ خزن نفس السر في الكوكي حتى APIs الثانية تمر
  res.cookies.set("admin_key", ADMIN_SECRET, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return res;
}
