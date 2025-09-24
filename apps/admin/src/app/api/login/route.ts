import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json();

  // hard-coded password check
  if (password !== "123") {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  // if password matches, set httpOnly cookie "auth_token"
  const res = NextResponse.json({ success: true });
  res.cookies.set("auth_token", "valid", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  return res;
}
