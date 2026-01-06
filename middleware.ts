import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const isAdminPath = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";

  // إذا مش مسار أدمن → اتركه
  if (!isAdminPath) {
    return NextResponse.next();
  }

  // اسمح لصفحة تسجيل الدخول
  if (isLoginPage) {
    return NextResponse.next();
  }

  // افحص الكوكي
  const adminKey = req.cookies.get("admin_key")?.value;

  if (adminKey !== process.env.ADMIN_SECRET){
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
