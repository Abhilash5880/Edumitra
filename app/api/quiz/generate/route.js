import OpenAI from "openai";

export async function POST(req) {
  const { topic, level } = await req.json();

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const prompt = `
  Generate 5 ${level} difficulty MCQs on ${topic}.
  Format:
  Q:
  A:
  B:
  C:
  D:
  Answer:
  `;

  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: prompt,
  });

  return Response.json({ quiz: response.output_text });
}
