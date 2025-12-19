"use client";
import { useState } from "react";
import StudyPlanCard from "@/components/StudyPlanCard";

export default function StudyPlanPage() {
  const [exam, setExam] = useState("");
  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [plan, setPlan] = useState([]); // keep array default

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

  const generatePlan = () => {
    const totalDays = Number(days);
    const hrs = Number(hours);

    const phases = [
      { label: "Basics & Fundamentals", ratio: 0.25 },
      { label: "Core Concepts", ratio: 0.4 },
      { label: "Practice", ratio: 0.25 },
      { label: "Revision + Mock Test", ratio: 0.1 },
    ];

    let newPlan = [];
    let dayCounter = 1;

    phases.forEach((phase, index) => {
      const phaseDays =
        index === phases.length - 1
          ? totalDays - (dayCounter - 1)
          : Math.max(1, Math.round(totalDays * phase.ratio));

      for (let i = 0; i < phaseDays && dayCounter <= totalDays; i++) {
        newPlan.push({
          day: dayCounter,
          topic: phase.label,
          hours: hrs,
        });
        dayCounter++;
      }
    });

    setPlan(newPlan);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Study Plan Generator</h1>

      {/* Inputs */}
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
        className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
      >
        Generate Plan
      </button>

      {plan.length > 0 && (
        <>
          <p className="mt-6 text-sm text-gray-500">
            🤖 AI-generated study plan (demo)
          </p>

          {/* Copy / Reset buttons */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={copyPlan}
              className="px-4 py-2 bg-gray-200 rounded"
              disabled={plan.length === 0}
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

      {/* Output */}
      <div className="mt-8 space-y-4">
        {plan.map((p) => (
          <StudyPlanCard
            key={p.day}
            day={p.day}
            topic={p.topic}
            hours={p.hours}
          />
        ))}
      </div>
    </div>
  );
}
