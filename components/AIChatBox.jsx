// components/AIChatBox.jsx
"use client";
import { useState } from "react";

export default function AIChatBox() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! Ask me any doubt about your syllabus." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    setMessages((s) => [...s, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/mentor/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.text }),
      });
      const data = await res.json();
      const reply = data?.reply || "Sorry, no answer.";
      setMessages((s) => [...s, { from: "bot", text: reply }]);
    } catch (err) {
      setMessages((s) => [...s, { from: "bot", text: "Error contacting mentor." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded border p-4 bg-white dark:bg-zinc-900">
      <div className="h-56 overflow-auto mb-3 space-y-2">
        {messages.map((m, i) => (
          <div key={i} className={m.from === "bot" ? "text-sm text-zinc-700" : "text-sm text-zinc-900 text-right"}>
            <div className={`inline-block px-3 py-2 rounded ${m.from === "bot" ? "bg-gray-100 dark:bg-zinc-800" : "bg-indigo-600 text-white"}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 rounded border px-3 py-2" placeholder="Ask a question..." />
        <button onClick={send} disabled={loading} className="rounded bg-indigo-600 px-4 py-2 text-white">{loading ? "..." : "Send"}</button>
      </div>
    </div>
  );
}
