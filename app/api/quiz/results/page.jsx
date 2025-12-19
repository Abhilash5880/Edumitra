"use client";

import { useEffect, useState } from "react";
import QuizResults from "@/components/QuizResults";
import mockQuiz from "@/utils/mockQuizData";

export default function ResultsPage() {
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const stored = localStorage.getItem("quizAnswers");
    if (stored) setAnswers(JSON.parse(stored));
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Quiz Results</h1>
      <QuizResults quiz={mockQuiz} answers={answers} />
    </div>
  );
}
