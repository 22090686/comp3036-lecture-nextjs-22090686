import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PostList from "./PostList";
import LogoutButton from "./LogoutButton";

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

async function getPosts(): Promise<Post[]> {
  const res = await fetch("http://localhost:3001/api/posts", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export default async function AdminHome() {
  // 🔑 Check for auth token
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token");

  if (!token) {
    redirect("/login"); // If no token, go to login
  }

  let posts: Post[] = [];
  try {
    posts = await getPosts();
  } catch {
    posts = [];
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Posts</h1>
        <LogoutButton />
      </div>

      <Link href="/create">
        <button className="mb-4 px-3 py-1 bg-green-500 text-white rounded">
          Create Post
        </button>
      </Link>

      <PostList posts={posts} />
    </main>
  );
}
