import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // نحمي كل admin ما عدا صفحة الدخول وملفات next الداخلية
  const isAdminPath = pathname.startsWith("/admin");
  const isLogin = pathname === "/admin/login";

  if (isAdminPath && !isLogin) {
    const adminKey = req.cookies.get("admin_key")?.value;
    if (!adminKey) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
