"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function PostDetail() {
  const params = useParams();
  const urlId = params.id;

  const [post, setPost] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        // Fetch all posts
        const res = await fetch("/api/posts");
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();

        const found = data.find((p: any) => p.urlId === urlId);
        if (!found) {
          setPost(null);
          setLoading(false);
          return;
        }

        setPost(found);
        setLoading(false);

        // Increment views
        await fetch("/api/posts/views", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: found.id }),
        });
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }

    fetchPost();
  }, [urlId]);

  if (loading) return <main>Loading...</main>;
  if (!post) return <main>Post not found</main>;

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-2">
        Category: {post.category} • Tags: {post.tags} • Views: {post.views} • Likes: {post.likes}
      </p>
      {post.imageUrl && (
        <img src={post.imageUrl} alt={post.title} className="mb-4 w-full max-h-96 object-cover" />
      )}
      <div>
        <pre>{post.content}</pre>
      </div>
    </main>
  );
}
