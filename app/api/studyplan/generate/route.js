import OpenAI from "openai";

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
