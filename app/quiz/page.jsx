"use client";
import { useState } from "react";
import QuizCard from "@/components/QuizCard";

export default function QuizPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const [topic, setTopic] = useState("Probability");
  const [difficulty, setDifficulty] = useState("easy");

  async function generateQuiz() {
    setLoading(true);
    setError(null);
    setSubmitted(false);
    setAnswers({});
    setScore(0);

    try {
      const res = await fetch("/api/quiz/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          difficulty,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error();

      // support both { quiz: [] } and [] responses
      setQuiz(data.quiz || data);
    } catch {
      setError("Unable to generate quiz. Please try again.");
    } finally {
      setLoading(false);
    }
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

      {/* ✅ Topic + Difficulty Controls */}
      <div className="flex gap-3 mb-6">
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Topic (e.g. Probability)"
          className="px-3 py-2 border rounded w-full"
        />

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <button
          onClick={generateQuiz}
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          {loading ? "Generating…" : "Generate"}
        </button>
      </div>

      {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

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
