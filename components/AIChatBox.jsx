"use client";
import { useState } from "react";

export default function AIChatBox() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! Ask me any doubt about your syllabus." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function send() {
    if (!input.trim() || loading) return;

    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/mentor/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.text }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error();

      setMessages((prev) => [
        ...prev,
        { from: "bot", text: data.reply || "No response." },
      ]);
    } catch {
      setError("AI is temporarily unavailable. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border p-4 bg-white shadow-sm">
      <div className="h-56 overflow-auto mb-3 space-y-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`text-sm ${
              m.from === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block px-3 py-2 rounded-lg ${
                m.from === "user"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {m.text}
            </span>
          </div>
        ))}
      </div>

      {loading && (
        <p className="text-xs text-gray-500 mb-1">AI is thinking… 🤖</p>
      )}
      {error && <p className="text-xs text-red-500 mb-1">{error}</p>}

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 rounded border px-3 py-2"
          placeholder="Ask a question..."
        />
        <button
          onClick={send}
          disabled={loading}
          className="rounded bg-indigo-600 px-4 py-2 text-white"
        >
          {loading ? "…" : "Send"}
        </button>
      </div>
    </div>
  );
}
