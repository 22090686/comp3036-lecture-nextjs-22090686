"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Post = {
  id: number;
  title: string;
  description: string;
  content: string;
  tags: string;
  imageUrl: string;
  category: string;
  active: boolean;
};

export default function PostForm({ post }: { post: Post }) {
  const router = useRouter();
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [content, setContent] = useState(post.content);
  const [tags, setTags] = useState(post.tags);
  const [imageUrl, setImageUrl] = useState(post.imageUrl);
  const [error, setError] = useState("");

  async function handleSave() {
    try {
      const res = await fetch("/api/posts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: post.id,
          title,
          description,
          content,
          tags,
          imageUrl,
          category: post.category,
        }),
      });

      if (!res.ok) throw new Error("Failed to update post");
      router.push("/"); // redirect to admin home
    } catch {
      setError("Failed to update post");
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <input value={title} onChange={e => setTitle(e.target.value)} className="border px-2 py-1 rounded" />
      <textarea value={description} onChange={e => setDescription(e.target.value)} className="border px-2 py-1 rounded" />
      <textarea value={content} onChange={e => setContent(e.target.value)} className="border px-2 py-1 rounded" rows={6} />
      <input value={tags} onChange={e => setTags(e.target.value)} className="border px-2 py-1 rounded" />
      <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="border px-2 py-1 rounded" />
      {error && <p className="text-red-500">{error}</p>}
      <button onClick={handleSave} className="bg-blue-500 text-white px-3 py-1 rounded">Save Post</button>
    </div>
  );
}
