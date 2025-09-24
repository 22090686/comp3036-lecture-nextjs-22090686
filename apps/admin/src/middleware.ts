import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token");

  if (!token) {
    // if no token, redirect to login page
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// apply only to admin routes that need protection
export const config = {
  matcher: ["/list", "/create", "/update/:path*"],
};
