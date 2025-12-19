// app/dashboard/page.jsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import AIChatBox from "@/components/AIChatBox";



export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const token = localStorage.getItem("token");

  // DEMO MODE: allow dashboard without login
  if (!token) {
    console.warn("Demo mode: no auth token found");
  }

  // ✅ IMPORTANT: finish loading check
  setLoading(false);
}, []);


  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          Checking session...
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-6xl px-6 py-8 flex gap-6">
        <Sidebar />
        <main className="flex-1">
          <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="rounded border p-4 bg-white">
              Progress
              <div className="text-2xl font-semibold mt-2">—</div>
            </div>
            <div className="rounded border p-4 bg-white">
              Next Quiz
              <div className="text-2xl font-semibold mt-2">—</div>
            </div>
            <div className="rounded border p-4 bg-white">
              Study Plan
              <div className="text-2xl font-semibold mt-2">—</div>
            </div>
          </div>

          <div className="rounded border p-4 bg-white mb-6">
            <h3 className="font-semibold mb-2">Recent Activity</h3>
            <p className="text-sm text-zinc-600">
              No activity yet — start by generating a quiz or study plan.
            </p>
          </div>

          {/* 🔽 ADDITIONS START HERE (C2) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded border p-4 bg-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">AI Mentor</h3>
                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                  Demo
                </span>
              </div>

              <p className="text-sm text-zinc-600 mb-3">
                Ask doubts, get explanations, or guidance based on your study plan.
              </p>

              <AIChatBox />
            </div>

            <div>
              <h3 className="font-semibold mb-2">Quick Actions</h3>
              <div className="rounded border p-4 bg-white space-y-2">
                <a
                  href="/quiz"
                  className="block rounded bg-indigo-600 text-white px-4 py-2 text-center"
                >
                  Start Quiz
                </a>
                <a
                  href="/studyplan"
                  className="block rounded border px-4 py-2 text-center"
                >
                  Create Study Plan
                </a>
              </div>
            </div>
          </div>
          {/* 🔼 ADDITIONS END HERE */}
        </main>
      </div>
    </>
  );
}
