import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function askAI(systemPrompt, userPrompt) {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
  {
    role: "system",
    content:
      "You are EduMitra AI Mentor, an expert exam coach. " +
        "You help students preparing for competitive exams like GATE, UPSC, JEE. " +
        "Answer clearly, concisely, and step-by-step. " +
        "Focus on concepts, shortcuts, and exam relevance. " +
        "If unsure, ask a clarifying question. " +
        "If asked for JSON, return ONLY valid JSON. No explanations.",
  },
  { role: "user", content: userPrompt },
],
    max_tokens: 600,

    temperature: 0.7,
  });

  return response.choices[0].message.content?.trim();

}
