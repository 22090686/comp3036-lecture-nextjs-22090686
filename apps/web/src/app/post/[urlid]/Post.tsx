"use client";

import { parse } from "marked";
import { useState } from "react";

export function ViewPost({ post }: { post: any }) {
  const [likes, setLikes] = useState(post.likes || 0);
  const [saving, setSaving] = useState(false);

  const handleLike = async () => {
    if (saving) return; // prevent multiple clicks
    setSaving(true);

    try {
      const res = await fetch("/api/posts/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: post.id }), // send only the id
      });

      if (!res.ok) throw new Error("Failed to save like");

      const updated = await res.json();
      setLikes(updated.likes); // update with backend value
    } catch (err) {
      console.error("Failed to save like", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-2">
        Category: {post.category} • Tags: {post.tags} • Views: {post.views} • Likes: {likes}
      </p>
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="mb-4 w-full max-h-96 object-cover"
        />
      )}
      <div
        className="mb-4"
        dangerouslySetInnerHTML={{ __html: parse(post.content) }}
      />
      <button
        onClick={handleLike}
        className="px-3 py-1 bg-blue-500 text-white rounded"
        disabled={saving}
      >
        Like {likes}
      </button>
    </div>
  );
}
