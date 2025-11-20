// app/register/page.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function Page() {
  const router = useRouter();
  const [state, setState] = useState({ name: "", email: "", examType: "UPSC", password: "" });
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  function onChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Registration failed");
      router.push("/login");
    } catch (error) {
      setErr(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-2xl px-6 py-20">
        <div className="rounded border bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold mb-4">Create an account</h1>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Full name</label>
              <input name="name" value={state.name} onChange={onChange} className="w-full rounded border px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input name="email" value={state.email} onChange={onChange} type="email" className="w-full rounded border px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm mb-1">Exam Type</label>
              <select name="examType" value={state.examType} onChange={onChange} className="w-full rounded border px-3 py-2">
                <option>UPSC</option>
                <option>GATE</option>
                <option>CAT</option>
                <option>JEE</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Password</label>
              <input name="password" value={state.password} onChange={onChange} type="password" className="w-full rounded border px-3 py-2" />
            </div>

            {err && <div className="text-red-600 text-sm">{err}</div>}

            <button type="submit" disabled={loading} className="rounded bg-indigo-600 px-4 py-2 text-white">{loading ? "Creating..." : "Create account"}</button>
          </form>
        </div>
      </main>
    </>
  );
}
