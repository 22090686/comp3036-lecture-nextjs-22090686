"use client";

import { useState, useEffect } from "react";
import { posts } from "@repo/db/data";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // check login status when page loads
  useEffect(() => {
    fetch("/api/check-auth")
      .then((res) => res.json())
      .then((data) => setLoggedIn(data.loggedIn))
      .catch(() => setLoggedIn(false));
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setLoggedIn(true);
      setError("");
    } else {
      setError("Invalid password");
    }
  }

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    setLoggedIn(false);
  }

  function handleStatusClick(status: boolean) {
    setMessage(`This post is currently ${status ? "Active" : "Inactive"}`);
    setTimeout(() => setMessage(""), 2000); // clear after 2s
  }

  if (loggedIn === null) {
    return <main>Loading...</main>;
  }

  if (!loggedIn) {
    return (
      <main className={styles.main}>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <button onClick={handleLogout}>Logout</button>

      <h1>Posts</h1>
      <Link href="/create">
        <button>Create Post</button>
      </Link>

      {message && <p style={{ color: "green" }}>{message}</p>}

      <ul className={styles.postList}>
        {posts.map((p) => (
          <li key={p.id} className={styles.postItem}>
            {/* Commented out because your posts data doesn't have an image yet */}
            {/* {p.image && (
              <img
                src={p.image}
                alt={p.title}
                className={styles.postImage}
                width={100}
              />
            )} */}

            {/* Title → links to update screen */}
            <Link href={`/update/${p.id}`}>
              <h2 className={styles.postTitle}>{p.title}</h2>
            </Link>

            {/* Metadata */}
            <div className={styles.meta}>
              <p>Category: {p.category}</p>
              {/* <p>Tags: {p.tags?.join(", ")}</p> */}
              <p>Status: {p.active ? "Active" : "Inactive"}</p>
              <button onClick={() => handleStatusClick(p.active)}>
                Check Status
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
