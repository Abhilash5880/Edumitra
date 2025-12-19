// components/Sidebar.jsx
"use client";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="h-screen w-64 bg-white border-r p-4 text-black">
      <h4 className="font-semibold mb-4">Navigation</h4>
      <ul className="space-y-2 text-sm">
        <li><Link href="/dashboard" className="block rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 hover:text-black">Dashboard</Link></li>
        <li><Link href="/quiz" className="block rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 hover:text-black">Quizzes</Link></li>
        <li><Link href="/studyplan" className="block rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 hover:text-black">Study Plan</Link></li>
        <li><Link href="/login" className="block rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 hover:text-black">Login</Link></li>
      </ul>
    </aside>
  );
}
