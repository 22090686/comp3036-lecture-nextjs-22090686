import { NextRequest, NextResponse } from "next/server";
import { posts, Post } from "@repo/db/data"; // <-- same array

export async function POST(req: NextRequest) {
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
    active: true,
  };

  posts.push(newPost); // modifies in-memory array
  return NextResponse.json(newPost);
}
