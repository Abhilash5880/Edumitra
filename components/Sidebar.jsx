// components/Sidebar.jsx
"use client";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-60 border-r p-4 hidden md:block bg-white dark:bg-zinc-900">
      <h4 className="font-semibold mb-4">Navigation</h4>
      <ul className="space-y-2 text-sm">
        <li><Link href="/dashboard" className="block px-2 py-1 rounded hover:bg-gray-50">Dashboard</Link></li>
        <li><Link href="/quiz" className="block px-2 py-1 rounded hover:bg-gray-50">Quizzes</Link></li>
        <li><Link href="/studyplan" className="block px-2 py-1 rounded hover:bg-gray-50">Study Plan</Link></li>
        <li><Link href="/login" className="block px-2 py-1 rounded hover:bg-gray-50">Login</Link></li>
      </ul>
    </aside>
  );
}
