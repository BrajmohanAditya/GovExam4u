import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import {timeMap} from "./TimeControle";
import DescriptiveForm from "./DescriptiveForm";
import { wordLimitMap } from "./WordLimitMap";
import { MaxMarksMap } from "./MaxMarksMap";
import QuestionPage from "./QuestionPage";
export default function Descriptive() {
  const [selectedType, setSelectedType] = useState("Essay"); // selectedType = "Letter"
  const [timeLeft, setTimeLeft] = useState(timeMap["Essay"]); // useState(600);
  const [wordCount, setWordCount] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const timerRef = useRef(null);
  const textRef = useRef(null);



  useEffect(() => {
    const savedType = sessionStorage.getItem("selectedType");
    if (savedType && timeMap[savedType]) {
      setSelectedType(savedType);
      setTimeLeft(timeMap[savedType]);
    }
  }, []); // 🔁 Kitni bhi baar state change ho — ye useEffect kabhi nahi chalega. npm run dev krta time he bus ak bar chalta hai.

  useEffect(() => {
    if (timerStarted) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          // yaha prev hamesha
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleSubmit(new Event("submit"));
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [timerStarted]); //   Is project me setTimerStarted(true) call hota hai line 130 pe tabhi ya run hoga

  const formatTime = (seconds) =>
    `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(
      seconds % 60
    ).padStart(2, "0")}`;

  const handleWordCount = (e) => {
    const text = e.target.value.trim();
    const count = text === "" ? 0 : text.split(/\s+/).length;
    setWordCount(count);
  };

  const handleTypeChange = (type) => {
    // the movement you click letter, essay then ya pura looop chalaga.
    setSelectedType(type); // state change
    setTimeLeft(timeMap[type]);
    sessionStorage.setItem("selectedType", type);
    setTimerStarted(false);
    clearInterval(timerRef.current);
    setWordCount(0);
    if (textRef.current) textRef.current.value = "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const textarea = textRef.current;
    let currentText = textarea.value.trim();

    const extraPrompt = `\n\n Marks out of ${MaxMarksMap[selectedType]}, check spelling error, check grammar error,  Max words should be: ${wordLimitMap[selectedType]}`;
    const finalText = currentText + extraPrompt;

    textarea.value = finalText;

    try {
      await navigator.clipboard.writeText(finalText);
      alert("✅ Submitted and copied to clipboard!");
    } catch (err) {
      console.warn("❌ Copy failed!", err);
      alert("❌ Copy failed! Please copy manually.");
    }

    setTimerStarted(false);
    clearInterval(timerRef.current);
    setTimeLeft(timeMap[selectedType]);
    setWordCount(0);
    textarea.value = "";
  }; // React re-renders the component only to refresh the UI, not to re-execute functions like handleSubmit.

  const handleCopyClick = () => {
    const text = textRef.current.value.trim();
    if (!text) return alert("Text Copied!");
    navigator.clipboard
      .writeText(text)
      .then(() => alert("✅ Copied to clipboard!"))
      .catch(() => alert("❌ Failed to copy!"));
  };
  return (
    <div className="bg-gray-100 font-sans min-h-screen">
      <Navbar selectedType={selectedType} handleTypeChange={handleTypeChange} />

      <div className="flex flex-col md:flex-row gap-4 px-0">
        {/* Left Column */}
        <div className="flex-1 flex flex-col h-[80vh] overflow-y-auto overflow-x-hidden">
          <div className="text-lg px-6 py-3 shadow-sm text-gray-500 bg-white ">
            User sees a random question (Essay/Letter/etc.), writes their answer
            in a textarea, clicks “Submit,” and the answer is copied to GPT
            evaluation engine, which evaluates and shows feedback (marks +
            suggestions).
            <div className="text-red-700 py-2">
              <strong>
                Max words: {wordLimitMap[selectedType]} &nbsp; Max Marks =
                {MaxMarksMap[selectedType]}
              </strong>
            </div>
          </div>

          <DescriptiveForm
            timeLeft={timeLeft}
            wordCount={wordCount}
            timerStarted={timerStarted}
            textRef={textRef}
            formatTime={formatTime}
            handleWordCount={handleWordCount}
            handleSubmit={handleSubmit}
            handleCopyClick={handleCopyClick}
            setTimerStarted={setTimerStarted}
          />
        </div>

        {/* Right Column */}
        <div className="w-full md:w-3/7 md:sticky md:top-4 self-start h-[80vh] overflow-y-auto overflow-x-hidden">
          <QuestionPage type={selectedType} />
        </div>
      </div>
    </div>
  );
}

