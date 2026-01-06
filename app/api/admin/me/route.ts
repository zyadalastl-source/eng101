import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const ADMIN_SECRET = process.env.ADMIN_SECRET || "";
  const cookie = req.headers.get("cookie") || "";

  const match = cookie.match(/(?:^|;\s*)admin_key=([^;]+)/);
  const adminKey = match ? decodeURIComponent(match[1]) : "";

  if (!ADMIN_SECRET || adminKey !== ADMIN_SECRET) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
