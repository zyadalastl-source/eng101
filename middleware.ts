import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

export function middleware(req: NextRequest) {
  const adminKey = process.env.ADMIN_KEY || "";
  const headerKey = req.headers.get("x-admin-key") || "";
  const cookieKey = req.cookies.get("admin_key")?.value || "";

  const ok =
    (headerKey && headerKey === adminKey) ||
    (cookieKey && cookieKey === adminKey);

  // السماح لصفحة تسجيل الدخول
  if (req.nextUrl.pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  if (!ok) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
