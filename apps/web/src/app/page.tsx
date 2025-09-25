"use client";

import { useState, useEffect } from "react";
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
  active: boolean; // include active field
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/api/posts") // fetch posts from backend
      .then((res) => res.json())
      .then((data) => {
        // filter only active posts
        setPosts(data.filter((post: Post) => post.active));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <main>Loading...</main>;

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">All Posts</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded">
            <Link href={`/posts/${post.id}`}>
              <h2 className="text-xl font-bold text-blue-600 hover:underline">
                {post.title}
              </h2>
            </Link>
            <p>{post.description}</p>
            <p className="text-sm text-gray-600">
              Category: {post.category} • Tags: {post.tags} • Views: {post.views} • Likes: {post.likes}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
