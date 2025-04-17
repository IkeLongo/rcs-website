import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(req: any) {
  const secret = process.env.AUTH_SECRET;

  const token = await getToken({ req, secret });

  // Debug: Log the token to verify its contents
  // console.log("Middleware Token:", token);

  const url = new URL(req.url);
  const pathname = url.pathname;

  // Redirect unauthenticated users trying to access protected routes
  if (!token && (pathname === "/dashboard" || pathname === "/admin/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const roleName = token?.role_name;

  // Debug: Log the extracted role_name
  // console.log("Extracted Role Name:", roleName);

  // ✅ Redirect logic
  if (pathname === "/dashboard" || pathname === "/admin/dashboard") {
    // Admin trying to access non-admin dashboard
    if (pathname === "/dashboard" && roleName === "Admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }

    // Non-admin trying to access admin dashboard
    if (pathname === "/admin/dashboard" && roleName !== "Admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}
