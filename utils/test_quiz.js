/**
 * utils/test_quiz.js
 *
 * Simple test script for the Edumitra quiz APIs.
 * Usage: node utils/test_quiz.js
 *
 * It will:
 *  - POST /api/quiz/generate to get a quiz
 *  - Build an answers map (choose first choice for each question)
 *  - POST /api/quiz/evaluate with quiz + answers
 *  - Print both responses (generated quiz and evaluation)
 *
 * Ensure your dev server is running (npm run dev) before running this.
 */

(async () => {
  try {
    const base = "http://localhost:3000";
    console.log("Requesting quiz from", base + "/api/quiz/generate");

    const genRes = await fetch(base + "/api/quiz/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic: "Probability", level: "easy", count: 5 }),
    });

    if (!genRes.ok) {
      const text = await genRes.text();
      throw new Error("Generate failed: " + genRes.status + " " + text);
    }

    const genJson = await genRes.json();
    console.log("Generated quiz:");
    console.log(JSON.stringify(genJson, null, 2));

    const quiz = genJson.quiz || [];
    if (!quiz.length) {
      console.log("No quiz returned. Exiting.");
      process.exit(0);
    }

    // Build answers: pick the first choice for every question (deterministic)
    const answers = {};
    quiz.forEach((q) => {
      answers[q.id] = Array.isArray(q.choices) && q.choices.length ? q.choices[0] : null;
    });

    console.log("Submitting answers (first choice for each question):");
    console.log(JSON.stringify(answers, null, 2));

    const evalRes = await fetch(base + "/api/quiz/evaluate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quiz, answers }),
    });

    if (!evalRes.ok) {
      const text = await evalRes.text();
      throw new Error("Evaluate failed: " + evalRes.status + " " + text);
    }

    const evalJson = await evalRes.json();
    console.log("Evaluation result:");
    console.log(JSON.stringify(evalJson, null, 2));
  } catch (err) {
    console.error("Test script error:", err);
    process.exit(1);
  }
})();
