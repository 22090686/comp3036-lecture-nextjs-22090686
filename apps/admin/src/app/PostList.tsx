"use client";

import Link from "next/link";

type Post = {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string;
  views: number;
  likes: number;
  imageUrl: string;
  active: boolean;
};

export default function PostList({
  posts,
  onUpdate,
  onDelete,
}: {
  posts: Post[];
  onUpdate?: (post: Post) => void;
  onDelete?: (id: number) => void;
}) {
  async function toggleActive(post: Post) {
    try {
      const res = await fetch("/api/posts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: post.id, active: !post.active }),
      });
      if (!res.ok) throw new Error("Failed to update post");
      const updated = await res.json();
      onUpdate?.(updated); // let parent update state
    } catch (err) {
      alert("Failed to toggle active state");
    }
  }

  async function deletePost(post: Post) {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      const res = await fetch(`/api/posts/${post.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete post");
      onDelete?.(post.id); // let parent update state
    } catch (err) {
      alert("Failed to delete post");
    }
  }

  if (posts.length === 0) {
    return <p className="text-gray-500">No posts available.</p>;
  }

  return (
    <ul className="space-y-4">
      {posts.map((post) => (
        <li
          key={post.id}
          className="border p-4 rounded flex justify-between items-start"
        >
          <div className="flex flex-col gap-1">
            <Link href={`/update/${post.id}`}>
              <h2 className="text-xl font-bold text-blue-600 hover:underline">
                {post.title || "(No Title)"}
              </h2>
            </Link>
            <p className="text-sm text-gray-600">
              Category: {post.category} • Tags: {post.tags} • Views: {post.views} • Likes: {post.likes}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => toggleActive(post)}
              className="px-2 py-1 border rounded"
            >
              {post.active ? "Active" : "Inactive"}
            </button>
            <button
              onClick={() => deletePost(post)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
