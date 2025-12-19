export default function ChatBubble({ sender, text }) {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`max-w-[75%] px-4 py-2 rounded-xl text-sm ${
          isUser
            ? "bg-indigo-600 text-white rounded-br-none"
            : "bg-gray-100 text-gray-800 rounded-bl-none"
        }`}
      >
        {!isUser && (
          <div className="text-xs font-semibold mb-1 text-indigo-600">
            🤖 AI Mentor
          </div>
        )}
        {text}
      </div>
    </div>
  );
}
