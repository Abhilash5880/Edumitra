// app/login/page.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Login failed");
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (error) {
      setErr(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-2xl px-6 py-20">
        <div className="rounded border bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold mb-4">Login</h1>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input type="email" className="w-full rounded border px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div>
              <label className="block text-sm mb-1">Password</label>
              <input type="password" className="w-full rounded border px-3 py-2" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            {err && <div className="text-red-600 text-sm">{err}</div>}

            <div className="flex items-center justify-between">
              <button type="submit" disabled={loading} className="rounded bg-indigo-600 px-4 py-2 text-white">{loading ? "Logging..." : "Login"}</button>
              <a href="/register" className="text-indigo-600">Create account</a>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
