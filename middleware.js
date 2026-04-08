import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

export function middleware(req) {
  const { pathname } = req.nextUrl;
  // const SECRET = process.env.JWT_SECRET;
  // console.log("SECRET:", SECRET);

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("adminToken")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

  //   try {
  //     jwt.verify(token, SECRET);
  //   } catch {
  //     return NextResponse.redirect(new URL("/admin/login", req.url));
  //   }
  return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
