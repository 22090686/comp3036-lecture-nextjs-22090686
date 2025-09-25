import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const idParam = url.pathname.split("/").pop();
    const postId = Number(idParam);

    if (isNaN(postId)) {
      return NextResponse.json({ message: "Invalid post ID" }, { status: 400 });
    }

    // Fetch all posts from your backend
    const res = await fetch("http://localhost:3001/api/posts");
    const posts = await res.json();

    const postExists = posts.some((p: any) => p.id === postId);
    if (!postExists) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    // Filter out the post to delete
    const updatedPosts = posts.filter((p: any) => p.id !== postId);

    // Overwrite posts on backend (make sure backend supports PUT)
    await fetch("http://localhost:3001/api/posts", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPosts),
    });

    return NextResponse.json({ success: true, id: postId });
  } catch (err) {
    return NextResponse.json({ message: "Failed to delete post" }, { status: 500 });
  }
}
