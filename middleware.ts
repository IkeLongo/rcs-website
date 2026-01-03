// middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const secret = process.env.AUTH_SECRET;

  // If you haven't set AUTH_SECRET in Netlify, this can cause weird failures.
  // Bail safely rather than erroring.
  if (!secret) return NextResponse.next();

  const token = await getToken({ req, secret });

  const { pathname } = req.nextUrl;

  // Protect only these routes (middleware matcher already scopes it,
  // but this keeps intent clear)
  if (!token && (pathname === "/dashboard" || pathname === "/admin/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const roleName = token?.role_name;

  if (pathname === "/dashboard" && roleName === "Admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  if (pathname === "/admin/dashboard" && roleName !== "Admin") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

// ✅ Critical: only run middleware on protected routes
export const config = {
  matcher: ["/dashboard", "/admin/dashboard"],
};
