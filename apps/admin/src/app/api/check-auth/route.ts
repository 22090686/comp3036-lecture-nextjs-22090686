import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authToken = req.cookies.get("auth_token")?.value;
  const loggedIn = authToken === "loggedin";

  return NextResponse.json({ loggedIn });
}
