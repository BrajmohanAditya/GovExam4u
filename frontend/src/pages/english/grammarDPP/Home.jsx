import React, { useEffect, useMemo, useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import Timer from "./timer";
import QuestionCard from "./QuestionCard";
import QuizIntro from "./QuizIntro";
import httpAction from "./httpAction";
import apis from "./apis";
import { toast } from "react-hot-toast";

export default function QuizPage() {
  /* ================= FETCH DATA ================= */
  const [sets, setSets] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);

  useEffect(() => {
    const fetchQuiz = async () => {
      const res = await httpAction({
        url: apis().getQuiz,
        method: "GET",
      });

      if (res?.status) {
        setAllQuestions(res.data);

        const uniqueSets = [...new Set(res.data.map((q) => q.set))].sort(
          (a, b) => {
            const na = parseInt(a.replace(/\D/g, ""), 10);
            const nb = parseInt(b.replace(/\D/g, ""), 10);
            return na - nb;
          }
        );

        setSets(uniqueSets);
      }
    };

    fetchQuiz();
  }, []);

  /* ================= STATE ================= */
  const [currentSet, setCurrentSet] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [lockedAnswers, setLockedAnswers] = useState({});

  const [testSubmitted, setTestSubmitted] = useState(false);
  const [retakeMode, setRetakeMode] = useState(false);

  const [remainingTime, setRemainingTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  const [postView, setPostView] = useState("result");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dbScore, setDbScore] = useState(null);
  /* ================= SET SELECTION ================= */
  const selectSet = async (setName) => {
    const data = {
      url: apis().verifyAttempt,
      method: "POST",
      body: { set: setName },
    };

    const res = await httpAction(data);

    // 🟡 CASE 1: Already attempted → SHOW RESULT
    if (res?.attempted) {
      setCurrentSet(setName);
      setTestSubmitted(true);
      setPostView("result");
      setTimerActive(false);
      setRemainingTime(0);
      setDbScore(res.score);
      setSelectedAnswers(res.answers || {});
      return; // 🔥 STOP here
    }

    // 🟢 CASE 2: Not attempted → START TEST
    if (res?.status) {
      setCurrentSet(setName);
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
      setLockedAnswers({});
      setTestSubmitted(false);
      setRetakeMode(false);
      setPostView("result");
      setRemainingTime(10 * 60);
      setTimerActive(true);
    }
  };

  /* ================= QUESTIONS ================= */
  const currentQuestions = useMemo(() => {
    if (!currentSet) return [];
    return allQuestions.filter((q) => q.set === currentSet);
  }, [currentSet, allQuestions]);

  const currentQuestion = currentQuestions[currentQuestionIndex];

  /* ================= TIMER ================= */
  const handleTick = (sec) => setRemainingTime(sec >= 0 ? sec : 0);

  const handleTimeUp = async () => {
    handleSubmit();
  };

  /* ================= OPTION SELECT ================= */
  const handleSelectOption = (qid, optionIndex) => {
    if (lockedAnswers[qid]) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [qid]: optionIndex,
    }));

    // Practice mode → lock immediately after click
    if (retakeMode) {
      setLockedAnswers((prev) => ({
        ...prev,
        [qid]: true,
      }));
    }
  };

  /* ================= NAVIGATION ================= */
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

  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {
    if (testSubmitted) return;
    const result = calculateResult();
    setTestSubmitted(true);
    setTimerActive(false);
    setPostView("result");
    const data = {
      url: apis().submitTest,
      method: "POST",
      body: {
        set: currentSet,
        score: result.finalScore,
        answers: selectedAnswers,
      },
    };
    const res = await httpAction(data);
    if (res?.status) {
      setDbScore(result.finalScore);
      toast.success(res?.message || "Test submitted successfully");
    } else {
      toast.error(res?.message || "Submission failed");
    }
  };

  /* =================  (PRACTICE MODE) ================= */
  const handleRetake = () => {
    setSelectedAnswers({});
    setLockedAnswers({});
    setCurrentQuestionIndex(0);

    setRetakeMode(true); // ✅ practice mode ON
    setTestSubmitted(false); // ✅ IMPORTANT (so answers not revealed)
    setPostView(null);

    setTimerActive(false);
    setRemainingTime(0);
  };

  /* ================= SCORE ================= */

  const calculateResult = () => {
    let correct = 0;
    let wrong = 0;

    currentQuestions.forEach((q) => {
      const selected = selectedAnswers[q._id];

      if (selected === undefined) return; // unattempted

      if (selected === q.correctAnswerIndex) {
        correct++;
      } else {
        wrong++;
      }
    });

    const negativeMarks = wrong * 0.25;
    const finalScore = correct - negativeMarks;

    return {
      correct,
      wrong,
      unattempted: currentQuestions.length - (correct + wrong),
      finalScore: Number(finalScore.toFixed(2)), // 2 decimal precision
      total: currentQuestions.length,
    };
  };

  const score = useMemo(
    () => calculateResult(),
    [currentQuestions, selectedAnswers]
  );

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onMobileMenu={() => setSidebarOpen(true)} />

      <Sidebar
        sets={sets}
        currentSet={currentSet}
        onSelectSet={selectSet}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="pt-14 lg:pl-72">
        <div className="p-4 max-w-6xl mx-auto">
          {!currentSet && <QuizIntro />}

          {/* ================= ACTIVE / PRACTICE ================= */}
          {currentSet && !testSubmitted && (
            <>
              <div className="flex justify-between mb-4">
                <div>
                  <h2 className="font-semibold">
                    {retakeMode
                      ? "Practice Mode"
                      : `Active Test: ${currentSet}`}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {currentQuestions.length} Questions
                  </p>
                </div>

                {!retakeMode && (
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Timer
                      initialSeconds={remainingTime}
                      isActive={timerActive}
                      onTick={handleTick}
                      onTimeUp={handleTimeUp}
                      stopWhen={testSubmitted}
                    />
                    <button
                      onClick={handleSubmit}
                      className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded font-medium"
                    >
                      Submit
                    </button>
                  </div>
                )}
              </div>

              {currentQuestion && (
                <QuestionCard
                  question={currentQuestion}
                  questionIndex={currentQuestionIndex}
                  total={currentQuestions.length}
                  selected={selectedAnswers[currentQuestion._id] ?? null}
                  onSelectOption={(idx) =>
                    handleSelectOption(currentQuestion._id, idx)
                  }
                  onNext={gotoNext}
                  onPrev={gotoPrev}
                  readOnly={false}
                  instantFeedback={retakeMode}
                  locked={!!lockedAnswers[currentQuestion._id]}
                />
              )}
            </>
          )}

          {/* ================= RESULT / ANALYSIS ================= */}
          {currentSet && testSubmitted && (
            <>
              <div className="flex justify-between mb-4">
                <h2 className="font-semibold">Result: {currentSet}</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPostView("result")}
                    className={`px-3 py-2 rounded ${
                      postView === "result"
                        ? "bg-blue-600 text-white"
                        : "bg-white border"
                    }`}
                  >
                    Result
                  </button>

                  <button
                    onClick={() => setPostView("analysis")}
                    className={`px-3 py-2 rounded ${
                      postView === "analysis"
                        ? "bg-blue-600 text-white"
                        : "bg-white border"
                    }`}
                  >
                    Analysis
                  </button>

                  <button
                    onClick={handleRetake}
                    className="px-3 py-2 bg-yellow-500 text-white rounded"
                  >
                    Practice
                  </button>
                </div>
              </div>

              {postView === "result" && (
                <div className="bg-white p-6 rounded shadow w-2xl ">
                  <h3 className="text-lg font-semibold mb-4 text-center">
                    Score Summary
                  </h3>

                  <div className="space-y-3 ">
                    <p className="text-base font-medium">
                      Total Marks :{" "}
                      <span className="font-semibold text-gray-700">
                        {score.total}
                      </span>
                    </p>

                    <p className="text-base font-medium">
                      Your Score :{" "}
                      <span className="font-bold text-blue-600">
                        {dbScore !== null ? dbScore : score.correct}
                      </span>
                    </p>
                  </div>
                </div>
              )}

              {postView === "analysis" && currentQuestion && (
                <QuestionCard
                  question={currentQuestion}
                  questionIndex={currentQuestionIndex}
                  total={currentQuestions.length}
                  selected={selectedAnswers[currentQuestion._id] ?? null}
                  onSelectOption={() => {}}
                  onNext={gotoNext}
                  onPrev={gotoPrev}
                  readOnly={true}
                  reveal={true}
                />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
