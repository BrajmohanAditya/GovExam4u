import React, { useMemo, useState, useEffect } from "react";
import { questions as allQuestions } from "./questions";
import Navbar from "./navbar";
import Sidebar from "./Sidebar";
import Timer from "./Timer";
import QuestionCard from "./QuestionCard";

export default function QuizPage() {
  const sets = useMemo(() => {
    const s = Array.from(new Set(allQuestions.map((q) => q.set)));
    return s;
  }, []);

  const [currentSet, setCurrentSet] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [lockedAnswers, setLockedAnswers] = useState({}); // { questionId: true } when user locked after selection in retake
  const [remainingTime, setRemainingTime] = useState(0);
  const [testSubmitted, setTestSubmitted] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [timerActive, setTimerActive] = useState(false);

  // New: retakeMode = true when user chose "Retake Set" and wants instant feedback without timer/submit.
  const [retakeMode, setRetakeMode] = useState(false);

  const startSet = (setName) => {
    setCurrentSet(setName);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setLockedAnswers({});
    setTestSubmitted(false);
    setRetakeMode(false);

    const durationSeconds = 10 * 60;
    setRemainingTime(durationSeconds);
    setTimerActive(true);
    setSidebarOpen(false);
  };

  const currentQuestions = useMemo(() => {
    if (!currentSet) return [];
    return allQuestions.filter((q) => q.set === currentSet);
  }, [currentSet]);

  const handleTick = (sec) => {
    setRemainingTime(sec >= 0 ? sec : 0);
  };

  const handleTimeUp = () => {
    setTimerActive(false);
    setTestSubmitted(true);
    setRetakeMode(false);
  };

  useEffect(() => {
    if (testSubmitted) {
      setTimerActive(false);
      setRetakeMode(false);
    }
  }, [testSubmitted]);

  // selection handler:
  const handleSelectOption = (questionId, optionValue) => {
    // If question is locked (e.g., in retake after they clicked), ignore further clicks
    if (lockedAnswers[questionId]) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionValue,
    }));

    // In retake mode we immediately show feedback and lock this question
    if (retakeMode) {
      setLockedAnswers((prev) => ({
        ...prev,
        [questionId]: true,
      }));
    }
  };

  const gotoNext = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
    }
  };
  const gotoPrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((i) => i - 1);
    }
  };

  const handleSubmit = () => {
    setTestSubmitted(true);
    setTimerActive(false);
    setRetakeMode(false);
  };

  // Retake action: user requested retake without timer/submit (instant feedback)
  const handleRetakeInstant = () => {
    // reset answers/locks and enable retakeMode
    setSelectedAnswers({});
    setLockedAnswers({});
    setCurrentQuestionIndex(0);
    setTestSubmitted(false);
    setRetakeMode(true);
    setTimerActive(false);
    setRemainingTime(0);
  };

  // Optional: Retake with timer (previous behavior) — keep as separate action if desired
  const handleRetakeWithTimer = () => {
    setSelectedAnswers({});
    setLockedAnswers({});
    setCurrentQuestionIndex(0);
    setTestSubmitted(false);
    setRetakeMode(false);
    const durationSeconds = 10 * 60;
    setRemainingTime(durationSeconds);
    setTimerActive(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <Sidebar
        sets={sets}
        currentSet={currentSet}
        onSelectSet={startSet}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <button
        className="fixed top-16 left-2 z-40 bg-blue-600 text-white p-2 rounded-md lg:hidden"
        onClick={() => setSidebarOpen((s) => !s)}
        aria-label="Open Sets"
      >
        Sets
      </button>

      <main className="pt-14 lg:pl-64">
        <div className="p-6">
          {!currentSet && (
            <div className="max-w-3xl mx-auto">
              <div className="bg-white p-6 rounded shadow">
                <h2 className="text-xl font-semibold mb-2">
                  Select a set to start the test
                </h2>
                <p className="text-sm text-gray-600">
                  Choose from the left to begin. Timer will start when you
                  select a set.
                </p>
              </div>
            </div>
          )}

          {currentSet && !testSubmitted && (
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">
                    Active Test: {currentSet}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {currentQuestions.length} Questions
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  {/* Hide Timer and Submit button when in retakeMode */}
                  {!retakeMode && (
                    <>
                      <Timer
                        initialSeconds={remainingTime}
                        isActive={timerActive}
                        onTick={handleTick}
                        onTimeUp={handleTimeUp}
                        stopWhen={testSubmitted}
                      />
                      <button
                        onClick={handleSubmit}
                        className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Submit Test
                      </button>
                    </>
                  )}

                  {/* If retakeMode show label */}
                  {retakeMode && (
                    <div className="px-3 py-2 bg-yellow-50 text-yellow-800 border rounded">
                      Retake Mode: Instant Feedback
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
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">
                    Review: {currentSet}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Submitted. Review your answers below (one question at a
                    time).
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={handleRetakeInstant}
                    className="px-3 py-2 bg-yellow-500 text-white rounded-md"
                  >
                    Retake (Instant Feedback)
                  </button>

                  <button
                    onClick={handleRetakeWithTimer}
                    className="px-3 py-2 bg-blue-600 text-white rounded-md"
                  >
                    Retake (With Timer)
                  </button>
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
                    onSelectOption={() => {}} // cannot change answers in full review
                    onNext={() => {
                      if (currentQuestionIndex < currentQuestions.length - 1)
                        setCurrentQuestionIndex((i) => i + 1);
                    }}
                    onPrev={() => {
                      if (currentQuestionIndex > 0)
                        setCurrentQuestionIndex((i) => i - 1);
                    }}
                    readOnly={true}
                    instantFeedback={false}
                    locked={true}
                  />
                ) : (
                  <div className="bg-white p-6 rounded shadow">
                    No questions available for this set.
                  </div>
                )}
              </section>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
            