import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ اسمح لصفحة اللوجن و API اللوجن/اللوجاوت بدون تحقق
  if (
    pathname === "/admin/login" ||
    pathname === "/api/admin/login" ||
    pathname === "/api/admin/logout"
  ) {
    return NextResponse.next();
  }

  // ✅ احمِ كل صفحات /admin/*
  if (pathname.startsWith("/admin")) {
    const cookieKey = req.cookies.get("admin_key")?.value || "";
    const adminKey = process.env.ADMIN_KEY || "";

    if (!adminKey) {
      // إذا ADMIN_KEY مش موجود على السيرفر
      return NextResponse.redirect(new URL("/admin/login?e=missing", req.url));
    }

    if (cookieKey !== adminKey) {
      return NextResponse.redirect(new URL("/admin/login?e=unauth", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
