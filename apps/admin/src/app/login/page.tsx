"use client";

import React, { useState } from "react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      window.location.href = "/"; // redirect to Admin Home
    } else {
      const data = await res.json();
      setError(data.message || "Invalid password");
    }
  }

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded">
          Login
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </main>
  );
}
