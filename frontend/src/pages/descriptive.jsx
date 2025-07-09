import React, { useState, useEffect } from "react";

export default function Descriptive() {
  const [wordCount, setWordCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  const handleChange = (e) => {
    const text = e.target.value;
    setWordCount(text.trim().split(/\s+/).filter(Boolean).length);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Submitted!");
  };

  const copyTextarea = () => {
    const textarea = document.getElementById("descriptiveBox");
    navigator.clipboard.writeText(textarea.value);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-center md:justify-start flex-wrap md:flex-nowrap px-4 my-4 space-x-0 md:space-x-8">
        <div
          id="timer"
          className="font-bold text-green-600 text-center md:text-left w-full md:w-auto mb-2 md:mb-0 ml-0 md:ml-[24%]"
        >
          Time left: {formatTime(timeLeft)}
        </div>
        <div className="my-2 font-bold text-gray-700 text-center">
          Word count: {wordCount}
        </div>
        <button
          onClick={copyTextarea}
          className="bg-zinc-800 text-white px-2.5 py-1 rounded-md text-sm cursor-pointer opacity-85 hover:opacity-100 hover:bg-zinc-700"
        >
          📋 Copy
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          id="descriptiveBox"
          name="prompt"
          rows="15"
          cols="50"
          required
          spellCheck={false}
          onPaste={(e) => e.preventDefault()}
          onCopy={(e) => e.preventDefault()}
          onCut={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2"
        />
        <div className="mt-4 space-x-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => window.open("https://chatgpt.com/", "_blank")}
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            ChatGpt
          </button>
        </div>
      </form>
    </div>
  );
}
