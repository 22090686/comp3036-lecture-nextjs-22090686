"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [previewing, setPreviewing] = useState(false);

  function validateForm() {
    if (!title || !description || !content) {
      setError("Title, Description, and Content are required");
      return false;
    }
    return true;
  }

  async function handleSave() {
    if (!validateForm()) return;

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          content,
          tags,
          imageUrl,
          category: category || "Uncategorized",
          date: new Date().toISOString(),
        }),
      });

      console.log("Response status:", res.status);
      const data = await res.json();
      console.log("Response body:", data);

      if (res.ok) {
        router.push("/"); // redirect to admin home
      } else {
        setError(data.message || "Failed to save post");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to save post");
    }
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Post</h1>
      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <button
          onClick={() => setPreviewing(!previewing)}
          className="bg-gray-300 px-2 py-1 rounded"
        >
          {previewing ? "Close Preview" : "Preview"}
        </button>
        {previewing ? (
          <div className="border p-2 rounded bg-gray-100">
            <pre>{content}</pre>
          </div>
        ) : (
          <textarea
            placeholder="Content (Markdown)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            className="border px-2 py-1 rounded"
          />
        )}
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <input
          type="url"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Save Post
        </button>
      </div>
    </main>
  );
}
