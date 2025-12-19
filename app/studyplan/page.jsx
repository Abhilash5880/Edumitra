"use client";
import { useState } from "react";
import StudyPlanCard from "@/components/StudyPlanCard";

export default function StudyPlanPage() {
  const [exam, setExam] = useState("");
  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [plan, setPlan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const copyPlan = () => {
    const text = plan
      .map((p) => `Day ${p.day}: ${p.topic} (${p.hours} hrs)`)
      .join("\n");
    navigator.clipboard.writeText(text);
    alert("Study plan copied to clipboard!");
  };

  const resetPlan = () => {
    setPlan([]);
  };

  async function generatePlan() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/studyplan/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exam, days, hours }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error();

      setPlan(data);
    } catch {
      setError("Study plan generation failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Study Plan Generator</h1>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <input
          className="border rounded-lg px-4 py-2"
          placeholder="Exam (e.g. GATE)"
          value={exam}
          onChange={(e) => setExam(e.target.value)}
        />
        <input
          className="border rounded-lg px-4 py-2"
          placeholder="Days left"
          type="number"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />
        <input
          className="border rounded-lg px-4 py-2"
          placeholder="Hours/day"
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />
      </div>

      <button
        onClick={generatePlan}
        disabled={loading}
        className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
      >
        {loading ? "Generating…" : "Generate Plan"}
      </button>

      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

      {plan.length > 0 && (
        <>
          <p className="mt-6 text-sm text-gray-500">
            🤖 AI-generated study plan (demo)
          </p>

          <div className="flex gap-3 mt-4">
            <button
              onClick={copyPlan}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Copy Plan
            </button>
            <button
              onClick={resetPlan}
              className="px-4 py-2 bg-red-100 text-red-600 rounded"
            >
              Reset
            </button>
          </div>
        </>
      )}

      <div className="mt-8 space-y-4">
        {plan.map((p) => (
          <StudyPlanCard key={p.day} {...p} />
        ))}
      </div>
    </div>
  );
}
