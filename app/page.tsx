// app/page.tsx (replace existing)
import Navbar from "@/components/Navbar";

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="text-3xl font-bold mb-4">Edumitra — Adaptive Learning Prototype</h1>
        <p className="mb-6 text-zinc-700">This is the UI-only prototype. Use the navigation above to explore the demo pages.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded border p-6 bg-white">
            <h3 className="font-semibold mb-2">Try a Quiz (demo)</h3>
            <p className="text-sm text-zinc-600">Generate and attempt sample quizzes — client-side UI only.</p>
            <a href="/quiz" className="inline-block mt-4 rounded bg-indigo-600 px-4 py-2 text-white">Go to Quiz</a>
          </div>

          <div className="rounded border p-6 bg-white">
            <h3 className="font-semibold mb-2">AI Mentor (demo)</h3>
            <p className="text-sm text-zinc-600">Ask questions to the AI Mentor (UI-only demo).</p>
            <a href="/dashboard" className="inline-block mt-4 rounded border px-4 py-2">Open Dashboard</a>
          </div>
        </div>
      </main>
    </>
  );
}
