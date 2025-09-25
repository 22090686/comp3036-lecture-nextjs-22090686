import { NextRequest, NextResponse } from "next/server";

// GET = return all posts
export async function GET() {
  const res = await fetch("http://localhost:3001/api/posts");
  const data = await res.json();
  return NextResponse.json(data);
}

// POST = create new post
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const newPost = {
      id: Date.now(), // simple unique ID
      urlId: body.title.toLowerCase().replace(/\s+/g, "-"),
      title: body.title,
      description: body.description,
      content: body.content,
      imageUrl: body.imageUrl || "",
      date: new Date(body.date),
      category: body.category || "Uncategorized",
      views: 0,
      likes: 0,
      tags: body.tags || "",
      active: true,
    };

    // Send to backend
    await fetch("http://localhost:3001/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    });

    return NextResponse.json(newPost); // ✅ always return JSON
  } catch (err) {
    return NextResponse.json({ message: "Failed to save post" }, { status: 500 });
  }
}

// PATCH = update existing post (content or active state)
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await fetch("http://localhost:3001/api/posts");
    const posts = await res.json();

    const post = posts.find((p: any) => p.id === body.id);
    if (!post) return NextResponse.json({ message: "Post not found" }, { status: 404 });

    if (body.title !== undefined) post.title = body.title;
    if (body.description !== undefined) post.description = body.description;
    if (body.content !== undefined) post.content = body.content;
    if (body.tags !== undefined) post.tags = body.tags;
    if (body.imageUrl !== undefined) post.imageUrl = body.imageUrl;
    if (body.category !== undefined) post.category = body.category;
    if (body.active !== undefined) post.active = body.active;

    await fetch("http://localhost:3001/api/posts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });

    return NextResponse.json(post);
  } catch (err) {
    return NextResponse.json({ message: "Failed to update post" }, { status: 500 });
  }
}
