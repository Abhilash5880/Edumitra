/*import OpenAI from "openai";

export async function POST(req) {
  const { exam, weakAreas } = await req.json();

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const prompt = `
  Generate a 7-day personalized study plan for the ${exam} exam.
  Focus more on these weak areas: ${weakAreas.join(", ")}.
  Format it day-wise.
  `;

  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: prompt,
  });

  return Response.json({ plan: response.output_text });
}
*/
import { safeParseJSON } from "@/lib/safeJson";
import { NextResponse } from "next/server";
import { askAI } from "@/lib/openai";

export async function POST(req) {
  const { exam, days, hours } = await req.json();

 const prompt = `
Create a realistic ${days}-day study plan for ${exam}.
Student can study ${hours} hours per day.
Include revision and practice days.
Return ONLY valid JSON array:
[
  { "day": 1, "topic": "", "hours": "" }
]
`;


  const raw = await askAI(
    "You create optimized study schedules.",
    prompt
  );

  const parsed = safeParseJSON(raw);

  if (!parsed) {
    return NextResponse.json(
      { error: "AI output invalid" },
      { status: 500 }
    );
  }

  const normalized = parsed.map((p) => ({
    day: p.day,
    topic: p.topic,
    hours: String(p.hours),
  }));

return NextResponse.json(normalized);

}

