import Link from "next/link";
import PostForm from "./PostForm";

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

// Server-side fetch
async function getPost(id: number): Promise<Post | null> {
  const res = await fetch("http://localhost:3001/api/posts", { cache: "no-store" });
  if (!res.ok) return null;
  const posts: Post[] = await res.json();
  return posts.find(p => p.id === id) || null;
}

export default async function UpdatePostPage({ params }: { params: { id: string } }) {
  const postId = Number(params.id);
  const post = await getPost(postId);

  if (!post) {
    return (
      <main className="max-w-2xl mx-auto p-6">
        <p>Post not found.</p>
        <Link href="/">Back to Admin Home</Link>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Update Post</h1>
      <PostForm post={post} />
    </main>
  );
}
