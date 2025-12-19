"use client";
import { useState } from "react";
import QuizCard from "@/components/QuizCard";

export default function QuizPage() {
  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  async function generateQuiz() {
    setSubmitted(false);
    setAnswers({});
    setScore(0);

    const res = await fetch("/api/quiz/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic: "Probability",
        level: "easy",
        count: 5,
      }),
    });

    const data = await res.json();
    setQuiz(data.quiz);
  }

  function handleAnswer(qid, choice) {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qid]: choice }));
  }

  function submitQuiz() {
    let correct = 0;

    quiz.forEach((q) => {
      if (answers[q.id] === q.answer) correct++;
    });

    setScore(Math.round((correct / quiz.length) * 100));
    setSubmitted(true);
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Practice Quiz</h1>

      <button
        onClick={generateQuiz}
        className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded"
      >
        Generate Quiz
      </button>

      {quiz.map((q) => (
        <QuizCard
          key={q.id}
          q={q}
          onAnswer={handleAnswer}
          submitted={submitted}
          userAnswer={answers[q.id]}
        />
      ))}

      {quiz.length > 0 && !submitted && (
        <button
          onClick={submitQuiz}
          className="mt-6 px-6 py-3 bg-green-600 text-white rounded"
        >
          Submit Quiz
        </button>
      )}

      {submitted && (
        <div className="mt-8 p-6 bg-gray-100 rounded-xl">
          <h2 className="text-xl font-bold mb-2">Results</h2>
          <p className="text-lg">
            Score: <span className="font-semibold">{score}%</span>
          </p>
        </div>
      )}
    </div>
  );
}
