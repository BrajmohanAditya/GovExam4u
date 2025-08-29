// DescriptiveForm.jsx
import React from "react";

export default function DescriptiveForm({
  timeLeft,
  wordCount,
  timerStarted,
  textRef,
  formatTime,
  handleWordCount,
  handleSubmit,
  handleCopyClick,
  setTimerStarted,
}) {
  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 px-4 py-4 text-center sm:text-left">
        <div className="text-green-600 font-bold">
          Time left: {formatTime(timeLeft)}
        </div>
        <div className="text-gray-700 font-bold">Word count: {wordCount}</div>
        <button
          onClick={handleCopyClick}
          className="bg-zinc-800 text-white px-3 py-1 rounded text-sm hover:bg-zinc-700 transition cursor-pointer"
        >
          📋 Copy
        </button>
      </div>

      <form
        id="descriptiveForm"
        onSubmit={handleSubmit}
        className="mx-4 md:mx-auto max-w-2xl flex flex-col gap-4 "
      >
        <textarea
          ref={textRef}
          name="prompt"
          rows="12"
          required
          spellCheck="false"
          className="w-full border border-gray-300 p-3 text-base rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          onFocus={() => !timerStarted && setTimerStarted(true)} // Jab element pe focus aaye (user click kare ya tab kare), aur agar timer start nahi hua hai, to usko start kar do."
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

        <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-4 ">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => window.open("https://chatgpt.com/", "_blank")}
            className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 cursor-pointer"
          >
            ChatGpt
          </button>
        </div>
      </form>
      <br />
    </div>
  );
}
