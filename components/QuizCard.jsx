"use client";
import { useState } from "react";

export default function QuizCard({ q, onAnswer, submitted, userAnswer }) {
  const [selected, setSelected] = useState(null);

  function choose(choice) {
    if (submitted) return;
    setSelected(choice);
    onAnswer(q.id, choice);
  }

  return (
    <div className="mb-6 p-6 border rounded-xl bg-white">
      <h3 className="font-semibold mb-4">{q.question}</h3>

      <div className="space-y-2">
        {q.choices.map((c) => {
          const isCorrect = submitted && c === q.answer;
          const isWrong = submitted && c === userAnswer && c !== q.answer;
          const isSelected = selected === c;

          return (
            <button
              key={c}
              onClick={() => choose(c)}
              className={`w-full text-left px-4 py-3 rounded-lg border transition
                ${
                  isCorrect
                    ? "bg-green-600 text-white border-green-600"
                    : isWrong
                    ? "bg-red-500 text-white border-red-500"
                    : isSelected
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-300"
                }
              `}
            >
              {c}
            </button>
          );
        })}
      </div>
    </div>
  );
}
