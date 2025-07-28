import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import {timeMap} from "./TimeControle";

export default function Descriptive() {
  console.log("6");
  const [selectedType, setSelectedType] = useState("Letter"); // selectedType = "Letter"
  const [timeLeft, setTimeLeft] = useState(timeMap["Letter"]);
  const [wordCount, setWordCount] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const timerRef = useRef(null);
  const textRef = useRef(null);
  console.log("13");

  useEffect(() => {
    console.log("🎯 Descriptive component mounted");
  }, []);

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
    console.log("52");
    setSelectedType(type); // state change
    setTimeLeft(timeMap[type]);
    sessionStorage.setItem("selectedType", type);
    setTimerStarted(false);
    clearInterval(timerRef.current);
    setWordCount(0);
    if (textRef.current) textRef.current.value = "";
    console.log("60");
  };
  console.log("65");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("66");
    const textarea = textRef.current;
    let currentText = textarea.value.trim();

    const extraPrompt =
      "\n\nMarks out of 15, check spelling error, check grammar error";
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

      <p className="text-lg  px-6 py-4 rounded-xl shadow-sm   ml-1 text-gray-500 ">
        User sees a random question (Essay/Letter/etc.), writes their answer in
        a textarea, clicks “Submit,” and the answer is copied to GPT evaluation
        engine, which evaluates and shows feedback (marks + suggestions).
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 px-4 py-4 text-center sm:text-left">
        <div className="text-green-600 font-bold">
          Time left: {formatTime(timeLeft)}
        </div>
        <div className="text-gray-700 font-bold">Word count: {wordCount}</div>
        <button
          onClick={handleCopyClick}
          className="bg-zinc-800 text-white px-3 py-1 rounded text-sm hover:bg-zinc-700 transition"
        >
          📋 Copy
        </button>
      </div>
      <form
        id="descriptiveForm"
        onSubmit={handleSubmit}
        className="mx-4 md:mx-auto max-w-2xl flex flex-col gap-4"
      >
        <textarea
          ref={textRef}
          name="prompt"
          rows="12"
          required
          spellCheck="false"
          className="w-full border border-gray-300 p-3 text-base rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          onFocus={() => !timerStarted && setTimerStarted(true)}
          onInput={(e) => {
            handleWordCount(e);
            if (e.target.value.includes("\n\n")) {
              e.target.value = e.target.value.replace(/\n\n+/g, "\n");
            }
          }}
          onPaste={(e) => e.preventDefault()}
          onCopy={(e) => e.preventDefault()}
          onCut={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
          onKeyDown={(e) => {
            const cursorAtEnd =
              e.target.selectionStart === e.target.value.length;
            if (
              !cursorAtEnd &&
              ![
                "Backspace",
                "Delete",
                "ArrowLeft",
                "ArrowRight",
                "Tab",
              ].includes(e.key)
            ) {
              e.preventDefault();
            }
          }}
        ></textarea>

        <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => window.open("https://chatgpt.com/", "_blank")}
            className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            ChatGpt
          </button>
        </div>
      </form>
    </div>
  );
}

