// app/quiz/page.tsx
"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import QuestionCard, { MCQ } from "@/components/QuestionCard";

type RawQuizResponse = { quizText?: string; quiz?: MCQ[] };

export default function QuizPage() {
  const [topic, setTopic] = useState("Probability");
  const [level, setLevel] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<MCQ[] | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function generateQuiz() {
    setError(null);
    setScore(null);
    setLoading(true);
    setQuestions(null);

    try {
      const res = await fetch("/api/quiz/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, level }),
      });
      const data: RawQuizResponse = await res.json();

      // If API returns structured JSON (preferred)
      if (data.quiz && Array.isArray(data.quiz)) {
        setQuestions(data.quiz);
        setLoading(false);
        return;
      }

      // Otherwise try to parse simple text into MCQs (best-effort)
      const text = data.quizText || (await res.text());
      const parsed = parseTextToMCQs(text);
      setQuestions(parsed);
    } catch (err: any) {
      setError(err.message || "Failed to generate quiz");
    } finally {
      setLoading(false);
    }
  }

  function parseTextToMCQs(text: string): MCQ[] {
    // Very simple parser: split by lines and detect Q: / A:/B:/C:/D:/ Answer:
    const blocks = text.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
    const parsed: MCQ[] = [];
    for (const block of blocks) {
      const lines = block.split(/\n/).map((l) => l.trim());
      let qText = "";
      const choices: string[] = [];
      for (const line of lines) {
        if (/^Q[:\s]/i.test(line)) qText = line.replace(/^Q[:\s]+/i, "");
        else if (/^[A-D][:]/i.test(line)) choices.push(line.replace(/^[A-D][:]\s*/i, ""));
      }
      if (qText && choices.length) {
        parsed.push({
          id: Math.random().toString(36).slice(2, 9),
          question: qText,
          choices,
        });
      }
    }
    // Fallback: if nothing parsed, make a placeholder sample question
    if (!parsed.length) {
      parsed.push({
        id: "sample1",
        question: "Sample: 2+2 = ?",
        choices: ["1", "2", "3", "4"],
      });
    }
    return parsed;
  }

  function handleAnswer(id: string, choice: string) {
    setAnswers((s) => ({ ...s, [id]: choice }));
  }

  function submitQuiz() {
    // Naive scoring: for demo purposes we will just count answered
    const total = questions?.length || 0;
    let cnt = 0;
    for (const q of questions || []) if (answers[q.id]) cnt++;
    setScore(Math.round((cnt / Math.max(1, total)) * 100));
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="mb-4 text-2xl font-bold">Practice Quiz</h1>

        <div className="mb-6 flex gap-3">
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="rounded border px-3 py-2"
            placeholder="Topic (e.g., Probability)"
          />
          <select value={level} onChange={(e) => setLevel(e.target.value)} className="rounded border px-3 py-2">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <button onClick={generateQuiz} className="rounded bg-indigo-600 px-4 py-2 text-white" disabled={loading}>
            {loading ? "Generating..." : "Generate Quiz"}
          </button>
        </div>

        {error && <div className="mb-4 text-red-600">{error}</div>}

        {questions ? (
          <>
            <div className="mb-4">
              {questions.map((q) => (
                <QuestionCard key={q.id} q={q} onAnswer={handleAnswer} />
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={submitQuiz} className="rounded bg-green-600 px-4 py-2 text-white">Submit</button>
              <button onClick={() => { setQuestions(null); setAnswers({}); setScore(null); }} className="rounded border px-4 py-2">Reset</button>
            </div>

            {score !== null && <div className="mt-4 text-lg">Score: {score}%</div>}
          </>
        ) : (
          <div className="text-zinc-600">No quiz loaded. Click "Generate Quiz" to start.</div>
        )}
      </main>
    </>
  );
}
