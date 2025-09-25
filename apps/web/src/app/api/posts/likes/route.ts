import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) return NextResponse.json({ message: "Missing post ID" }, { status: 400 });

    // fetch all posts
    const res = await fetch("http://localhost:3001/api/posts");
    const posts = await res.json();

    const post = posts.find((p: any) => p.id === id);
    if (!post) return NextResponse.json({ message: "Post not found" }, { status: 404 });

    // increment likes
    post.likes = (post.likes || 0) + 1;

    // save back to backend (overwrite posts array)
    await fetch("http://localhost:3001/api/posts", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(posts),
    });

    return NextResponse.json({ likes: post.likes });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to save like" }, { status: 500 });
  }
}
