import { useState } from "react";

export default function ChatInput({ onSend }) {
  const [message, setMessage] = useState("");

  function handleSend() {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  }

  return (
    <div className="flex gap-2 mt-4">
      <input
        className="flex-1 border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Ask your AI Mentor..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        onClick={handleSend}
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700"
      >
        Send
      </button>
    </div>
  );
}
