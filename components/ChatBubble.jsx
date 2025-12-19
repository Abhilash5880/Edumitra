export default function ChatBubble({ sender, text }) {
  const isUser = sender === "user";

  return (
    <div
      className={`max-w-[80%] px-4 py-2 rounded-xl text-sm leading-relaxed ${
        isUser
          ? "ml-auto bg-indigo-600 text-white"
          : "mr-auto bg-white border shadow-sm"
      }`}
    >
      {text}
    </div>
  );
}