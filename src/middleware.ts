import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const adminPath = process.env.ADMIN_PATH;
  const { pathname } = request.nextUrl;

  // Block direct /admin/* access — return 404
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return new NextResponse(null, { status: 404 });
  }

  // Rewrite /{secret}/* → /admin/*
  if (
    adminPath &&
    (pathname === `/${adminPath}` || pathname.startsWith(`/${adminPath}/`))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(`/${adminPath}`, "/admin") || "/admin";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico|.*\\.png$).*)"],
};
