import { NextRequest, NextResponse } from "next/server";

// GET = fetch all posts from Web backend
export async function GET() {
  try {
    const res = await fetch("http://localhost:3001/api/posts");
    if (!res.ok) throw new Error("Failed to fetch posts from Web backend");
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ message: "Failed to fetch posts" }, { status: 500 });
  }
}

// PATCH = update a post via Web backend
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await fetch("http://localhost:3001/api/posts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error("Failed to update post in Web backend");
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ message: "Failed to update post" }, { status: 500 });
  }
}
