// app/quiz/page.jsx
"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import QuizCard from "@/components/QuizCard";

export default function Page() {
  const [topic, setTopic] = useState("Probability");
  const [level, setLevel] = useState("medium");
  const [questions, setQuestions] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(null);

  async function generate() {
    setLoading(true);
    setQuestions(null);
    setScore(null);
    try {
      const res = await fetch("/api/quiz/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, level }),
      });
      const data = await res.json();
      // Expecting structured { quiz: [...] }
      setQuestions(data.quiz || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleAnswer(id, choice) {
    setAnswers((s) => ({ ...s, [id]: choice }));
  }

  function submit() {
    // Client-side naive scoring (demo) — count answered
    const total = (questions || []).length;
    const answered = Object.keys(answers).length;
    setScore(Math.round((answered / Math.max(1, total)) * 100));
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 py-8">
        <h1 className="text-2xl font-bold mb-4">Practice Quiz</h1>

        <div className="flex gap-3 mb-6">
          <input value={topic} onChange={(e) => setTopic(e.target.value)} className="rounded border px-3 py-2" placeholder="Topic" />
          <select value={level} onChange={(e) => setLevel(e.target.value)} className="rounded border px-3 py-2">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <button onClick={generate} disabled={loading} className="rounded bg-indigo-600 px-4 py-2 text-white">{loading ? "Generating..." : "Generate"}</button>
        </div>

        {questions && questions.length > 0 ? (
          <>
            {questions.map((q) => <QuizCard key={q.id} q={q} onAnswer={handleAnswer} />)}
            <div className="flex gap-3">
              <button onClick={submit} className="rounded bg-green-600 px-4 py-2 text-white">Submit</button>
              <button onClick={() => { setQuestions(null); setAnswers({}); setScore(null); }} className="rounded border px-4 py-2">Reset</button>
            </div>
            {score !== null && <div className="mt-4 text-lg">Score: {score}%</div>}
          </>
        ) : (
          <div className="text-zinc-600">No quiz loaded. Click Generate to start.</div>
        )}
      </main>
    </>
  );
}
