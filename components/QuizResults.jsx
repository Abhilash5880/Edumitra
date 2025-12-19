export default function QuizResults({ quiz, answers }) {
  let score = 0;

  quiz.forEach((q) => {
    if (answers[q.id] === q.answer) score++;
  });

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">
        Score: {score} / {quiz.length}
      </h2>

      {quiz.map((q) => (
        <div key={q.id} className="border rounded-lg p-4">
          <p className="font-semibold">{q.question}</p>
          <p className="mt-2">
            Your Answer:{" "}
            <span
              className={
                answers[q.id] === q.answer
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {answers[q.id] || "Not answered"}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            Correct Answer: {q.answer}
          </p>
        </div>
      ))}
    </div>
  );
}
