import { NextRequest, NextResponse } from "next/server";
import { posts, Post } from "@repo/db/data";

// GET = return all posts
export async function GET() {
  return NextResponse.json(posts);
}

// POST = create new post
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const newPost: Post = {
      id: posts.length + 1,
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
      active: body.active ?? true, // allow default active
    };

    posts.push(newPost);
    return NextResponse.json(newPost);
  } catch (err) {
    return NextResponse.json({ message: "Failed to save post" }, { status: 500 });
  }
}

// PATCH = update existing post
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const post = posts.find((p) => p.id === body.id);
    if (!post) return NextResponse.json({ message: "Post not found" }, { status: 404 });

    // Update all fields that may have changed
    post.title = body.title ?? post.title;
    post.description = body.description ?? post.description;
    post.content = body.content ?? post.content;
    post.tags = body.tags ?? post.tags;
    post.imageUrl = body.imageUrl ?? post.imageUrl;
    post.category = body.category ?? post.category;
    if (body.active !== undefined) post.active = body.active; // important for toggle

    return NextResponse.json(post);
  } catch (err) {
    return NextResponse.json({ message: "Failed to update post" }, { status: 500 });
  }
}
