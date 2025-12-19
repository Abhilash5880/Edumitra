import { NextResponse } from "next/server";
import { askAI } from "@/lib/openai";

export async function POST(req) {
  const { message } = await req.json();

  const reply = await askAI(
    "You are an AI study mentor helping students understand concepts clearly.",
    message
  );

  return NextResponse.json({ reply });
}
