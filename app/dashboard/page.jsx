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
    if (!token) router.push("/login");
    else setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">Checking session...</div>
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
            <div className="rounded border p-4 bg-white">Progress<br/><div className="text-2xl font-semibold mt-2">—</div></div>
            <div className="rounded border p-4 bg-white">Next Quiz<br/><div className="text-2xl font-semibold mt-2">—</div></div>
            <div className="rounded border p-4 bg-white">Study Plan<br/><div className="text-2xl font-semibold mt-2">—</div></div>
          </div>

          <div className="rounded border p-4 bg-white mb-6">
            <h3 className="font-semibold mb-2">Recent Activity</h3>
            <p className="text-sm text-zinc-600">No activity yet — start by generating a quiz or study plan.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">AI Mentor</h3>
              <AIChatBox />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Quick Actions</h3>
              <div className="rounded border p-4 bg-white space-y-2">
                <a href="/quiz" className="block rounded bg-indigo-600 text-white px-4 py-2 text-center">Start Quiz</a>
                <a href="/studyplan" className="block rounded border px-4 py-2 text-center">Create Study Plan</a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
