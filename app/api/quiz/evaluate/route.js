// app/api/quiz/evaluate/route.js
import { NextResponse } from "next/server";

/**
 * POST /api/quiz/evaluate
 * Body: { quiz: [{ id, question, choices, answer }], answers: { [questionId]: chosenText } }
 *
 * Returns: { total, correct, score (0-100), details: [{id, correctAnswer, givenAnswer, correct: bool}], }
 *
 * NOTE: For a production system you would check server-stored correct answers (DB) rather than trusting the quiz payload from client.
 */

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
