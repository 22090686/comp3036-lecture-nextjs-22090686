"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ViewPost } from "./Post"; // adjust path if needed

export default function PostDetail() {
  const params = useParams();
  const urlId = params.urlid; // use correct param key

  const [post, setPost] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
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

        // Increment views in backend
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
      {/* Home Button */}
      <div className="mb-4">
        <Link
          href="/"
          className="px-3 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
        >
          Home
        </Link>
      </div>

      <ViewPost post={post} />
    </main>
  );
}
