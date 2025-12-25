import React, { useMemo, useState, useEffect } from "react";
import { questions as allQuestions } from "./questions";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import Timer from "./timer";
import QuestionCard from "./QuestionCard";

export default function QuizPage() {
  const sets = useMemo(
    () => Array.from(new Set(allQuestions.map((q) => q.set))),
    []
  );

  const [currentSet, setCurrentSet] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [lockedAnswers, setLockedAnswers] = useState({});
  const [remainingTime, setRemainingTime] = useState(0);
  const [testSubmitted, setTestSubmitted] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [retakeMode, setRetakeMode] = useState(false);

  // post-submission view: "result" or "analysis"
  const [postView, setPostView] = useState("result");
  // per-question reveal state for Analysis (true = reveal feedback for that question)
  const [revealedAnalysis, setRevealedAnalysis] = useState({}); // { questionId: true }

  // New: selectSet switches to a set WITHOUT resetting the timer if a test is already active.
  // It will start the timer only when there is no active timer (i.e., true "start a test" action).
  const selectSet = (setName) => {
    // If user clicked the currently active set, do nothing
    if (currentSet === setName) {
      setSidebarOpen(false);
      return;
    }

    setCurrentSet(setName);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setLockedAnswers({});
    setTestSubmitted(false);
    setRetakeMode(false);
    setPostView("result");
    setRevealedAnalysis({});

    // Start timer only if there's no active timer (so switching sets during an active test won't reset it)
    if (!timerActive) {
      const durationSeconds = 10 * 60;
      setRemainingTime(durationSeconds);
      setTimerActive(true);
    }

    setSidebarOpen(false);
  };

  const currentQuestions = useMemo(() => {
    if (!currentSet) return [];
    return allQuestions.filter((q) => q.set === currentSet);
  }, [currentSet]);

  const handleTick = (sec) => setRemainingTime(sec >= 0 ? sec : 0);
  const handleTimeUp = () => {
    setTimerActive(false);
    setTestSubmitted(true);
    setRetakeMode(false);
    setPostView("result");
  };

  useEffect(() => {
    if (testSubmitted) {
      setTimerActive(false);
      setRetakeMode(false);
      setPostView("result");
    }
  }, [testSubmitted]);

  const handleSelectOption = (questionId, optionValue) => {
    if (lockedAnswers[questionId]) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionValue }));
    if (retakeMode) {
      setLockedAnswers((prev) => ({ ...prev, [questionId]: true }));
    }
  };

  // Helper: reveal analysis for a question id
  const revealAnalysisFor = (questionId) => {
    setRevealedAnalysis((prev) => ({ ...prev, [questionId]: true }));
  };

  // Navigation handlers updated to auto-reveal in analysis mode
  const gotoNext = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      const newIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(newIndex);
      if (postView === "analysis") {
        const q = currentQuestions[newIndex];
        if (q && q.id) revealAnalysisFor(q.id);
      }
    }
  };

  const gotoPrev = () => {
    if (currentQuestionIndex > 0) {
      const newIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(newIndex);
      if (postView === "analysis") {
        const q = currentQuestions[newIndex];
        if (q && q.id) revealAnalysisFor(q.id);
      }
    }
  };

  const handleSubmit = () => {
    setTestSubmitted(true);
    setTimerActive(false);
    setRetakeMode(false);
    setPostView("result");
  };

  const handleRetakeInstant = () => {
    setSelectedAnswers({});
    setLockedAnswers({});
    setCurrentQuestionIndex(0);
    setTestSubmitted(false);
    setRetakeMode(true);
    setPostView(null);
    setRevealedAnalysis({});
    setTimerActive(false);
    setRemainingTime(0);
  };

  const handleRetakeWithTimer = () => {
    setSelectedAnswers({});
    setLockedAnswers({});
    setCurrentQuestionIndex(0);
    setTestSubmitted(false);
    setRetakeMode(false);
    setPostView(null);
    setRevealedAnalysis({});
    const durationSeconds = 10 * 60;
    setRemainingTime(durationSeconds);
    setTimerActive(true);
  };

  // Compute results
  const score = useMemo(() => {
    if (!currentQuestions.length) return { correct: 0, total: 0 };
    let correct = 0;
    currentQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) correct += 1;
    });
    return { correct, total: currentQuestions.length };
  }, [currentQuestions, selectedAnswers]);

  const currentQuestion = currentQuestions[currentQuestionIndex];

  // When switching to analysis view, auto-reveal current question
  useEffect(() => {
    if (postView === "analysis" && currentQuestion && currentQuestion.id) {
      revealAnalysisFor(currentQuestion.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postView, currentQuestionIndex, currentQuestion]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onMobileMenu={() => setSidebarOpen(true)} />

      <Sidebar
        sets={sets}
        currentSet={currentSet}
        onSelectSet={selectSet} // <-- changed to use selectSet (no reset when timer active)
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="pt-14 lg:pl-72">
        <div className="p-4 sm:p-6 max-w-6xl mx-auto">
          {!currentSet && (
            <div
              className="w-full flex items-center justify-center"
              style={{ minHeight: "60vh" }}
            >
              <div
                className="bg-white rounded-lg shadow-md flex flex-col items-center justify-center p-6
                           w-64 sm:w-72 md:w-80 lg:w-96 aspect-square"
              >
                <h2 className="text-center text-lg sm:text-xl font-semibold">
                  Select a set to start the test
                </h2>
                <p className="text-center text-sm text-gray-500 mt-3 px-2">
                  Choose from the left to begin. Timer will start when you
                  select a set.
                </p>
              </div>
            </div>
          )}

          {currentSet && !testSubmitted && (
            <div className="space-y-4 max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold">
                    Active Test: {currentSet}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {currentQuestions.length} Questions
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  {!retakeMode && (
                    <div className="flex items-center gap-3">
                      <Timer
                        initialSeconds={remainingTime}
                        isActive={timerActive}
                        onTick={handleTick}
                        onTimeUp={handleTimeUp}
                        stopWhen={testSubmitted}
                      />
                      <button
                        onClick={handleSubmit}
                        className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                      >
                        Submit Test
                      </button>
                    </div>
                  )}

                  {retakeMode && (
                    <div className="px-3 py-2 bg-yellow-50 text-yellow-800 border rounded text-sm">
                      Retake Mode
                    </div>
                  )}
                </div>
              </div>

              <section>
                {currentQuestions.length > 0 ? (
                  <QuestionCard
                    question={currentQuestions[currentQuestionIndex]}
                    questionIndex={currentQuestionIndex}
                    total={currentQuestions.length}
                    selected={
                      selectedAnswers[
                        currentQuestions[currentQuestionIndex].id
                      ] ?? null
                    }
                    onSelectOption={(opt) =>
                      handleSelectOption(
                        currentQuestions[currentQuestionIndex].id,
                        opt
                      )
                    }
                    onNext={gotoNext}
                    onPrev={gotoPrev}
                    readOnly={false}
                    instantFeedback={retakeMode}
                    locked={
                      !!lockedAnswers[currentQuestions[currentQuestionIndex].id]
                    }
                    reveal={false}
                    showExplanationProp={true}
                  />
                ) : (
                  <div className="bg-white p-6 rounded shadow">
                    No questions available for this set.
                  </div>
                )}
              </section>
            </div>
          )}

          {currentSet && testSubmitted && (
            <div className="space-y-4 max-w-6xl mx-auto">
              {/* Header with Result + Retake */}
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold">
                    Review: {currentSet}
                  </h2>
                  <p className="text-sm text-gray-500">Submitted.</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPostView("result")}
                    className={`px-3 py-2 rounded-md text-sm ${
                      postView === "result"
                        ? "bg-blue-600 text-white"
                        : "bg-white border"
                    }`}
                  >
                    Result
                  </button>

                  <button
                    onClick={handleRetakeInstant}
                    className="px-3 py-2 bg-yellow-500 text-white rounded-md text-sm"
                  >
                    Retake 
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  {currentQuestions.length > 0 ? (
                    <>
                      {postView === "analysis" && (
                        <QuestionCard
                          question={currentQuestions[currentQuestionIndex]}
                          questionIndex={currentQuestionIndex}
                          total={currentQuestions.length}
                          selected={
                            selectedAnswers[
                              currentQuestions[currentQuestionIndex].id
                            ] ?? null
                          }
                          onSelectOption={() => {}}
                          onNext={gotoNext}
                          onPrev={gotoPrev}
                          readOnly={false}
                          instantFeedback={false}
                          locked={true}
                          reveal={
                            !!revealedAnalysis[
                              currentQuestions[currentQuestionIndex].id
                            ]
                          }
                          showExplanationProp={true}
                        />
                      )}

                      {postView === "result" && (
                        <div className="bg-white p-6 rounded shadow max-w-4xl mx-auto">
                          <h3 className="text-lg font-semibold">Result</h3>
                          <p className="mt-2 text-sm text-gray-600">
                            Your score for {currentSet}:
                          </p>
                          <div className="mt-4 text-2xl font-bold">
                            {score.correct} / {score.total}
                          </div>
                          <div className="mt-2 text-sm text-gray-700">
                            {Math.round(
                              (score.correct / Math.max(1, score.total)) * 100
                            )}
                            %
                          </div>

                          <div className="mt-4">
                            <button
                              onClick={() => setPostView("analysis")}
                              className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm"
                            >
                              Show Analysis
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="bg-white p-6 rounded shadow">
                      No questions available for this set.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
