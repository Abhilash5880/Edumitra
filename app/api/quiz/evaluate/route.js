// app/api/quiz/evaluate/route.js
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const quiz = Array.isArray(body.quiz) ? body.quiz : [];
    const answers = body.answers || {};

    if (!quiz.length) {
      return NextResponse.json({ error: "No quiz provided" }, { status: 400 });
    }

    let correct = 0;
    const details = quiz.map((q) => {
      const given = answers[q.id] ?? null;
      const isCorrect = given !== null && String(given).trim() === String(q.answer).trim();
      if (isCorrect) correct++;
      return {
        id: q.id,
        question: q.question,
        correctAnswer: q.answer,
        givenAnswer: given,
        correct: isCorrect,
      };
    });

    const total = quiz.length;
    const score = Math.round((correct / Math.max(1, total)) * 100);

    return NextResponse.json({ total, correct, score, details }, { status: 200 });
  } catch (err) {
    console.error("quiz evaluate error:", err);
    return NextResponse.json({ error: err.message || "Server error evaluating quiz" }, { status: 500 });
  }
}
