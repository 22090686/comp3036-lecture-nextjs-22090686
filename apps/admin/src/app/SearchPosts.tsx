"use client";

import { useState } from "react";
import PostList from "./PostList";

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

export default function SearchPosts({ posts: initialPosts }: { posts: Post[] }) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [query, setQuery] = useState("");

  const filtered = posts.filter((post) => {
    const q = query.toLowerCase();
    return (
      post.title.toLowerCase().includes(q) ||
      post.description.toLowerCase().includes(q) ||
      post.category.toLowerCase().includes(q) ||
      post.tags.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <PostList
        posts={filtered}
        onUpdate={(updated) =>
          setPosts((prev) =>
            prev.map((p) => (p.id === updated.id ? updated : p))
          )
        }
        onDelete={(id) =>
          setPosts((prev) => prev.filter((p) => p.id !== id))
        }
      />
    </div>
  );
}
