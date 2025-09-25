import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });
  // Remove the cookie
  res.cookies.set({
    name: "auth_token",
    value: "",
    path: "/",
    maxAge: 0,
  });
  return res;
}
