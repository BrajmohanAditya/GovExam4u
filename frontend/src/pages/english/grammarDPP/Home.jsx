import React, { useEffect, useMemo, useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import Timer from "./timer";
import QuestionCard from "./QuestionCard";
import QuizIntro from "./QuizIntro";
import httpAction from "./httpAction";
import apis from "./apis";
import { toast } from "react-hot-toast";
import InstructionModal from "./InstructionModal";

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
  const [dbScore, setDbScore] = useState(null); // score from database
  const [leaderboard, setLeaderboard] = useState([]);
  const [userName, setUserName] = useState("");
  const [showInstructions, setShowInstructions] = useState(false);
  const [pendingSet, setPendingSet] = useState(null); // yaha v current set hi hai
  const [isLocked, setIsLocked] = useState(); //--

  /* ================= SET SELECTION ================= */

  const fetchLockStatus = async (setName) => {
    const res = await httpAction({
      url: apis().isLocked(setName),
      method: "GET",
    });

    if (res?.status) {
      setIsLocked(res.isLocked);
    }
  };

  const fetchLeaderboard = async (setName) => {
    const data = {
      url: apis().leaderboard,
      method: "POST",
      body: { set: setName },
    };

    const res = await httpAction(data);

    if (res?.status) {
      setLeaderboard(res.data);
    }
  };

  const selectSet = async (setName) => {
    // 🔥 AUTO-SUBMIT CONDITION
    if (currentSet && !testSubmitted && !retakeMode) {
      await handleSubmit(true); // auto-submit current set
    }
    const data = {
      url: apis().verifyAttempt,
      method: "POST",
      body: { set: setName },
    };
    // 🔥 FETCH ALL USERS + MARKS FOR ACTIVE SET
    const res = await httpAction(data);

    if (res?.status || res?.attempted) {
      fetchLeaderboard(setName);
    }

    // 🟡 CASE 1: Already attempted → SHOW RESULT
    if (res?.attempted) {
      setCurrentSet(setName);
      setTestSubmitted(true);
      setPostView("result");
      setTimerActive(false);
      setRemainingTime(0);
      setDbScore(res.score); // set score from database
      setUserName(res.name);
      setSelectedAnswers(res.answers || {});
      return; // 🔥 STOP here
    }

    // 🟢 CASE 2: Not attempted → START TEST
    if (res?.status) {
      await fetchLockStatus(setName);
      setPendingSet(setName);
      setShowInstructions(true);
    }
  };

  /* ================= LOCK TOGGLE ================= */


    const handleToggleLock = async (setName, newValue) => {
      const res = await httpAction({
        url: apis().toggleLock(setName),
        method: "PUT",
        body: { isLocked: newValue },
      });

      if (res?.status) {
        setIsLocked(res.isLocked);
        toast.success(res.message || "Lock updated");
      } else {
        toast.error(res?.message || "Lock update failed");
      }
    };

  const startTest = () => {
    if (isLocked) {
      toast.error("Exam is locked. You cannot start the test.");
      return;
    }
    setShowInstructions(false);

    setCurrentSet(pendingSet);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setLockedAnswers({});
    setTestSubmitted(false);
    setRetakeMode(false);
    setPostView("result");

    setRemainingTime(10 * 60);
    setTimerActive(true);

    setPendingSet(null);
  };

  /* ================= CURRENT USER RANK ================= */
  const currentUserRank = useMemo(() => {
    if (!leaderboard.length || !userName) return null;

    const index = leaderboard.findIndex((u) => u.name === userName);

    return index !== -1 ? index + 1 : null;
  }, [leaderboard, userName]);

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

  const handleSubmit = async (isAuto = false) => {
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
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center mb-4">
                <h2 className="font-semibold">Result: {currentSet}</h2>
                <div className="flex gap-2">
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
              {/* ===== SCORE SUMMARY CARD ===== */}

              {postView === "result" && (
                <div className="flex flex-col lg:flex-row gap-6 justify-center">
                  <div className="max-w-md w-full bg-white p-6 rounded shadow text-gray-800">
                    <h3 className="text-base sm:text-lg font-semibold mb-4 text-center">
                      Score Summary
                    </h3>

                    <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                      <p className="text-lg text-gray-500 text-center mb-3">
                        <span className="font-medium">{userName}</span>
                      </p>
                      <p className="font-medium grid grid-cols-2">
                        <span>Total Marks :</span>
                        <span className="font-semibold text-blue-600 text-right">
                          {score.total}
                        </span>
                      </p>

                      <p className="font-medium grid grid-cols-2">
                        <span>Your Score :</span>
                        <span className="font-bold text-blue-600 text-right">
                          {dbScore !== null ? dbScore : score.correct}
                        </span>
                      </p>

                      {/* 🏆 RANK */}
                      {currentUserRank && (
                        <p className="font-medium grid grid-cols-2">
                          <span>Your Rank :</span>
                          <span className="font-bold text-blue-600 text-right">
                            {currentUserRank}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* ===== LEADERBOARD CARD ===== */}
                  <div className="max-w-md w-full bg-white p-8 rounded shadow">
                    <h3 className="text-base sm:text-lg font-semibold mb-4 text-center">
                      Leaderboard – {currentSet}
                    </h3>

                    {/* 🔥 SCROLLABLE AREA */}
                    <div className="max-h-64 overflow-y-auto">
                      {leaderboard.length === 0 ? (
                        <p className="text-center text-sm text-gray-500">
                          No attempts yet
                        </p>
                      ) : (
                        <div>
                          <table className="w-full text-sm sm:text-base border-collapse">
                            <thead className="sticky top-0 bg-gray-100">
                              <tr>
                                <th className="text-left p-2">Rank</th>
                                <th className="text-left p-2">Name</th>
                                <th className="text-right p-2">Score</th>
                              </tr>
                            </thead>

                            <tbody>
                              {leaderboard.map((u, idx) => (
                                <tr key={`${u.userId}-${idx}`}>
                                  <td className="p-2">{idx + 1}</td>
                                  <td className="p-2">{u.name}</td>
                                  <td className="p-4 text-right font-semibold text-blue-600">
                                    {u.score}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
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
      <InstructionModal
        open={showInstructions}
        onClose={() => {
          setShowInstructions(false);
          setPendingSet(null);
        }}
        onConfirm={startTest}
        setName={pendingSet}
        isLocked={isLocked}
        onToggleLock={handleToggleLock}
      />
    </div>
  );
}
