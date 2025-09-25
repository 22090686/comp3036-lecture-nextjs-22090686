import { NextRequest, NextResponse } from "next/server";

const PASSWORD = "123"; // hard-coded password

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { password } = body;

  if (password === PASSWORD) {
    const res = NextResponse.json({ success: true });
    // Set httpOnly cookie
    res.cookies.set({
      name: "auth_token",
      value: "loggedin",
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
    });
    return res;
  } else {
    return NextResponse.json({ success: false, message: "Invalid password" }, { status: 401 });
  }
}
