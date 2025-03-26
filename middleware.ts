import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(req: any) {
  const secret = process.env.AUTH_SECRET;

  const token = await getToken({ req, secret });
  const url = new URL(req.url);
  const pathname = url.pathname;

  // Redirect unauthenticated users trying to access protected routes
  if (!token && (pathname === "/dashboard" || pathname === "/admin/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const isAdmin = token?.is_admin;

  // ✅ Redirect logic
  if (pathname === "/dashboard" || pathname === "/admin/dashboard") {
    // Admin trying to access non-admin dashboard
    if (pathname === "/dashboard" && isAdmin) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }

    // Non-admin trying to access admin dashboard
    if (pathname === "/admin/dashboard" && !isAdmin) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}
