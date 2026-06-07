import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("admin_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (token !== process.env.ADMIN_SECRET_TOKEN) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

// Protect /admin pages AND the /api/registrations admin endpoint
export const config = {
  matcher: ["/admin", "/admin/((?!login).*)", "/api/registrations"],
};
