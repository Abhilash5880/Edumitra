/* app/api/quiz/generate/route.js




async function generateMockQuiz(topic = "General", level = "medium", count = 5) {
 
  const baseQs = [
    {
      id: "q1",
      question: `What is 2 + 2? (${topic})`,
      choices: ["1", "2", "3", "4"],
      answer: "4",
    },
    {
      id: "q2",
      question: `Which is a prime number?`,
      choices: ["4", "6", "7", "8"],
      answer: "7",
    },
    {
      id: "q3",
      question: `What is the capital of India?`,
      choices: ["Mumbai", "Chennai", "Kolkata", "New Delhi"],
      answer: "New Delhi",
    },
    {
      id: "q4",
      question: `Solve: 5 * 3 = ?`,
      choices: ["8", "15", "10", "5"],
      answer: "15",
    },
    {
      id: "q5",
      question: `Which gas do plants primarily use for photosynthesis?`,
      choices: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"],
      answer: "Carbon Dioxide",
    },
  ];

  const quiz = [];
  for (let i = 0; i < Math.min(count, baseQs.length); i++) {
    // clone & give unique IDs
    const q = { ...baseQs[i], id: `${baseQs[i].id}_${i + 1}` };
    quiz.push(q);
  }
  return quiz;
}

async function generateWithOpenAI(topic = "General", level = "medium", count = 5) {
  // This function demonstrates how to call OpenAI — requires env OPENAI_API_KEY and USE_OPENAI=true
  // It returns array of objects: {id, question, choices: [], answer}
  const OPENAI_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_KEY) throw new Error("OPENAI_API_KEY not configured");

  // Example prompt — you can refine for better structured output
  const prompt = `Generate ${count} multiple-choice questions (4 choices each) on the topic "${topic}" with level ${level}. 
Return as JSON array of objects with fields: id, question, choices (array of 4 strings), answer (the correct choice text).`;

  // Use fetch to call the OpenAI chat/completions API or the openai npm lib if you installed it.
  // Using the HTTP API here (requires Node fetch available). Adjust if you use openai SDK.
  const resp = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini", // or "gpt-4o" / "gpt-4" depending on your access
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      max_tokens: 800,
    }),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`OpenAI error: ${resp.status} ${text}`);
  }

  const j = await resp.json();
  // Try to parse JSON from assistant. This is best-effort and may need tuning.
  const assistant = j.choices?.[0]?.message?.content || "";
  try {
    // Attempt simple JSON parse
    const parsed = JSON.parse(assistant);
    return parsed;
  } catch (e) {
    // Fallback: if assistant returned plain text, return mock so UI keeps working
    console.warn("OpenAI returned non-JSON, falling back to mock", assistant);
    return generateMockQuiz(topic, level, count);
  }
}

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const topic = body.topic || "General";
    const level = body.level || "medium";
    const count = Math.max(1, Math.min(10, parseInt(body.count || 5)));

    let quiz;
    if (process.env.USE_OPENAI === "true") {
      try {
        quiz = await generateWithOpenAI(topic, level, count);
      } catch (err) {
        console.error("OpenAI generation failed:", err);
        quiz = await generateMockQuiz(topic, level, count);
      }
    } else {
      quiz = await generateMockQuiz(topic, level, count);
    }

    // Ensure we return structured quiz array. Each question includes "answer" field so evaluate can grade.
    return NextResponse.json({ quiz }, { status: 200 });
  } catch (err) {
    console.error("quiz generate error:", err);
    return NextResponse.json({ error: err.message || "Server error generating quiz" }, { status: 500 });
  }
}
*/
import { safeParseJSON } from "@/lib/safeJson";
import { NextResponse } from "next/server";
import { askAI } from "@/lib/openai";

export async function POST(req) {
  const { topic, difficulty } = await req.json();

  const prompt = `
Generate 5 multiple-choice questions on ${topic} (${difficulty}).
Return JSON array ONLY:
[
  {
    "question": "",
    "choices": ["", "", "", ""],
    "answer": ""
  }
]
`;

  const raw = await askAI("You generate academic quizzes.", prompt);
  const parsed = safeParseJSON(raw?.trim());

  if (!parsed || !Array.isArray(parsed)) {
    // 🔐 DEMO SAFE FALLBACK
    return NextResponse.json(
      [
        {
          id: "demo-q1",
          question: "Demo question: What is 2 + 2?",
          choices: ["1", "2", "3", "4"],
          answer: "4",
        },
      ],
      { status: 200 }
    );
  }

  // 🔐 Normalize IDs
  const normalized = parsed.map((q, i) => ({
    id: `ai-q${i + 1}`,
    question: q.question,
    choices: q.choices,
    answer: q.answer,
  }));

  return NextResponse.json(normalized);
}

