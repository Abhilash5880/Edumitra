"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import QuizCard from "@/components/QuizCard";
import mockQuiz from "@/utils/mockQuizData";

export default function QuizPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState({});

  const handleSelect = (id, choice) => {
    setAnswers({ ...answers, [id]: choice });
  };

  const handleSubmit = () => {
    localStorage.setItem("quizAnswers", JSON.stringify(answers));
    router.push("/quiz/results");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Practice Quiz</h1>

      {mockQuiz.map((q) => (
        <QuizCard
          key={q.id}
          question={q.question}
          options={q.choices}
          selected={answers[q.id]}
          onSelect={(choice) => handleSelect(q.id, choice)}
        />
      ))}

      <button
        onClick={handleSubmit}
        className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
      >
        Submit Quiz
      </button>
    </div>
  );
}
