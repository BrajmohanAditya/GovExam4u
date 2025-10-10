import React, { useEffect, useRef, useState } from "react";

// QuestionsIndexLayout.jsx
// Single-file React component (Tailwind CSS assumed available)
// Layout: LEFT -> Questions, RIGHT -> Index (sticky). Mobile: index collapses above questions.

const questions = [
  {
    id: "q1",
    title: "Question 1: Banking Exam Pattern",
    body: "Explain the latest banking exam pattern and marks distribution in short points.",
  },
  {
    id: "q2",
    title: "Question 2: Time Management",
    body: "How will you manage time during mains descriptive section? Give 3 quick tips.",
  },
  {
    id: "q3",
    title: "Question 3: Essay Topic",
    body: "Write a short outline on 'Digital India and Financial Inclusion'.",
  },
  {
    id: "q4",
    title: "Question 4: Error Spotting",
    body: "Spot and correct the error in the sentence: 'He don't know the answer.'",
  },
  {
    id: "q5",
    title: "Question 5: Programming",
    body: "Explain the backtracking approach for Sudoku solver in 5 lines.",
  },
  {
    id: "q6",
    title: "Question 6: Current Affairs",
    body: "Mention two recent RBI policy updates and their impact.",
  },
];

export default function computerQuize() {
  const [active, setActive] = useState(questions[0].id);
  const containerRef = useRef(null);
  const refs = useRef({});

  useEffect(() => {
    // Create refs for every question
    questions.forEach((q) => {
      refs.current[q.id] = refs.current[q.id] || React.createRef();
    });

    const observerOpts = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, observerOpts);

    // observe
    Object.values(refs.current).forEach((r) => {
      if (r.current) observer.observe(r.current);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = refs.current[id]?.current;
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Questions (spans 8 on large screens) */}
        <main className="lg:col-span-8">
          <div
            className="bg-white rounded-2xl shadow p-6 space-y-6"
            ref={containerRef}
          >
            <h1 className="text-2xl font-semibold">Questions</h1>
            <p className="text-sm text-gray-500">
              Click an index item on the right to jump. This area contains full
              questions and answers.
            </p>

            <div className="space-y-8 mt-4">
              {questions.map((q, idx) => (
                <article
                  key={q.id}
                  id={q.id}
                  ref={refs.current[q.id]}
                  className="p-4 rounded-lg border border-gray-100"
                >
                  <header className="flex items-start justify-between">
                    <div>
                      <h2 className="text-lg font-medium">
                        {idx + 1}. {q.title}
                      </h2>
                      <p className="text-xs text-gray-400 mt-1">ID: {q.id}</p>
                    </div>
                    <div className="text-sm text-gray-500">Quick</div>
                  </header>

                  <div className="mt-3 text-gray-700">
                    <p>{q.body}</p>
                    {/* Example short answer block (you can replace with real content) */}
                    <div className="mt-3 bg-gray-50 p-3 rounded">
                      <strong className="block">Short answer:</strong>
                      <p className="text-sm mt-2">
                        (This is a placeholder short answer. Replace with actual
                        notes / explanation.)
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </main>

        {/* Right: Index (spans 4 on large screens) */}
        <aside className="lg:col-span-4">
          <div className="hidden lg:block sticky top-6">
            <div className="bg-white rounded-2xl shadow p-4">
              <h3 className="text-lg font-semibold mb-2">Index</h3>
              <p className="text-xs text-gray-400 mb-3">Jump to any question</p>

              <nav className="space-y-2">
                {questions.map((q, i) => (
                  <button
                    key={q.id}
                    onClick={() => scrollTo(q.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-150 focus:outline-none ${
                      active === q.id
                        ? "bg-indigo-50 border border-indigo-200"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {i + 1}. {q.title}
                      </span>
                      <span className="text-xs text-gray-400">{q.id}</span>
                    </div>
                  </button>
                ))}
              </nav>

              <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500">
                Tip: Use keyboard <span className="font-semibold">/</span> to
                focus search (on future enhancement).
              </div>
            </div>
          </div>

          {/* Mobile index - collapsible at top */}
          <div className="lg:hidden mt-4">
            <details className="bg-white rounded-2xl shadow p-3">
              <summary className="font-medium">Index (tap to open)</summary>
              <div className="mt-3 space-y-2">
                {questions.map((q, i) => (
                  <button
                    key={q.id}
                    onClick={() => scrollTo(q.id)}
                    className="w-full text-left px-3 py-2 rounded hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm">
                        {i + 1}. {q.title}
                      </span>
                      <span className="text-xs text-gray-400">{q.id}</span>
                    </div>
                  </button>
                ))}
              </div>
            </details>
          </div>
        </aside>
      </div>

      {/* Small footer / actions */}
      <div className="max-w-7xl mx-auto mt-6 flex items-center justify-end gap-3">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm shadow"
        >
          Back to top
        </button>
      </div>
    </div>
  );
}
