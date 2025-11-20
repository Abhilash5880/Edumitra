// components/QuizCard.jsx
"use client";
import { useState } from "react";

export default function QuizCard({ q, onAnswer }) {
  const [selected, setSelected] = useState(null);

  function choose(choice) {
    setSelected(choice);
    onAnswer(q.id, choice);
  }

  return (
    <div className="rounded-md border p-4 mb-4 bg-white dark:bg-zinc-900">
      <div className="mb-3 font-medium">{q.question}</div>
      <div className="grid gap-2">
        {q.choices.map((c, idx) => (
          <button
            key={idx}
            onClick={() => choose(c)}
            className={`text-left rounded px-3 py-2 border transition ${
              selected === c ? "bg-indigo-600 text-white border-indigo-600" : "hover:bg-gray-50 dark:hover:bg-zinc-800"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
