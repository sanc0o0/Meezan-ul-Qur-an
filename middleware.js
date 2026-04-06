import { NextResponse } from "next/server";

export function middleware(req) {
  const auth = req.headers.get("authorization");

  if (!auth) {
    return new Response("Auth required", {
      status: 401,
      headers: {
        "WWW-Authenticate": "Basic realm='Secure Area'",
      },
    });
  }

  const base64Credentials = auth.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii",
  );

  const [username, password] = credentials.split(":");

  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASS
  ) {
    return NextResponse.next();
  }

  return new Response("Access Denied", { status: 403 });
}

export const config = {
  matcher: ["/admin"],
};
