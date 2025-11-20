// components/Navbar.jsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const path = usePathname();
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(typeof window !== "undefined" ? localStorage.getItem("token") : null);
  }, [path]);

  return (
    <nav className="w-full border-b bg-white/80 backdrop-blur-sm dark:bg-zinc-900/60">
      <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold">EduMitra</Link>
        <div className="flex gap-3 items-center">
          <Link href="/quiz" className="px-3 py-1 rounded-md hover:bg-gray-100">Practice</Link>
          <Link href="/studyplan" className="px-3 py-1 rounded-md hover:bg-gray-100">Study Plan</Link>
          {!token ? (
            <>
              <Link href="/login" className="px-3 py-1 rounded-md">Login</Link>
              <Link href="/register" className="px-3 py-1 rounded-md bg-indigo-600 text-white">Get Started</Link>
            </>
          ) : (
            <Link href="/dashboard" className="px-3 py-1 rounded-md bg-indigo-600 text-white">Dashboard</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
