import { useState } from "react";

export default function ChatInput({ value, onChange, onSend }) {
  const [message, setMessage] = useState("");

  function handleSend() {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  }

  return (
    <div className="border-t bg-white p-3 flex gap-2">
      <input
        value={value}
        onChange={onChange}
        placeholder="Ask a question…"
        className="flex-1 rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        onClick={onSend}
        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
      >
        Send
      </button>
    </div>
  );
}