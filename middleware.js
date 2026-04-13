import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("admin_token")?.value;

  // If no token, redirect to login immediately
  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Optional but recommended: verify token validity here
  // e.g. if using JWT: verify signature
  // For a simple secret token, just check the value:
  if (token !== process.env.ADMIN_SECRET_TOKEN) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

// Only protect /admin routes (but not /admin/login itself)
export const config = {
  matcher: ["/admin", "/admin/((?!login).*)"],
};
