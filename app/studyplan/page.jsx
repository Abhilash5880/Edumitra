// app/studyplan/page.jsx
"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function Page() {
  const [targetExam, setTargetExam] = useState("UPSC");
  const [weeks, setWeeks] = useState(12);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    setPlan(null);
    try {
      const res = await fetch("/api/studyplan/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exam: targetExam, weeks }),
      });
      const data = await res.json();
      setPlan(data.plan || data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 py-8">
        <h1 className="text-2xl font-bold mb-4">Generate Study Plan</h1>

        <div className="flex gap-3 mb-6">
          <select value={targetExam} onChange={(e) => setTargetExam(e.target.value)} className="rounded border px-3 py-2">
            <option>UPSC</option>
            <option>GATE</option>
            <option>CAT</option>
            <option>JEE</option>
          </select>
          <input type="number" value={weeks} onChange={(e) => setWeeks(Number(e.target.value))} className="rounded border px-3 py-2 w-28" />
          <button onClick={generate} disabled={loading} className="rounded bg-indigo-600 px-4 py-2 text-white">{loading ? "Generating..." : "Generate"}</button>
        </div>

        {plan ? (
          <div className="rounded border p-4 bg-white">
            <pre className="whitespace-pre-wrap text-sm">{typeof plan === "string" ? plan : JSON.stringify(plan, null, 2)}</pre>
          </div>
        ) : (
          <div className="text-zinc-600">No plan yet. Generate to create a study plan.</div>
        )}
      </main>
    </>
  );
}
