// import React, { useEffect, useRef, useState } from "react";
// import Navbar from "../Navbar/Descriptive";
// import {timeMap} from "../Navbar/TimeControle";


// export default function Descriptive() {
//   const [selectedType, setSelectedType] = useState("Letter");
//   const [timeLeft, setTimeLeft] = useState(timeMap["Letter"]);
//   const [wordCount, setWordCount] = useState(0);
//   const [timerStarted, setTimerStarted] = useState(false);
//   const timerRef = useRef(null);
//   const textRef = useRef(null);


//   useEffect(() => {
//     console.log("🎯 Descriptive component mounted");
//   }, []);

//   useEffect(() => {
//     const savedType = sessionStorage.getItem("selectedType");
//     if (savedType && timeMap[savedType]) {
//       setSelectedType(savedType);
//       setTimeLeft(timeMap[savedType]);
//     }
//   }, []);

//   useEffect(() => {
//     if (timerStarted) {
//       timerRef.current = setInterval(() => {
//         setTimeLeft((prev) => {
//           if (prev <= 1) {
//             clearInterval(timerRef.current);
//             handleSubmit(new Event("submit"));
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//     }
//     return () => clearInterval(timerRef.current);
//   }, [timerStarted]);

//   const formatTime = (seconds) =>
//     `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(
//       seconds % 60
//     ).padStart(2, "0")}`;

//   const handleWordCount = (e) => {
//     const text = e.target.value.trim();
//     const count = text === "" ? 0 : text.split(/\s+/).length;
//     setWordCount(count);
//   };

//   const handleTypeChange = (type) => {
//     setSelectedType(type);
//     setTimeLeft(timeMap[type]);
//     sessionStorage.setItem("selectedType", type);
//     setTimerStarted(false);
//     clearInterval(timerRef.current);
//     setWordCount(0);
//     if (textRef.current) textRef.current.value = "";
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const textarea = textRef.current;
//     let currentText = textarea.value.trim();

//     const extraPrompt =
//       "\n\nMarks out of 15, check spelling error, check grammar error";
//     const finalText = currentText + extraPrompt;

//     textarea.value = finalText;

//     try {
//       await navigator.clipboard.writeText(finalText);
//       alert("✅ Copied to clipboard!");
//     } catch (err) {
//       console.warn("❌ Copy failed!", err);
//       alert("❌ Copy failed! Please copy manually.");
//     }

//     setTimerStarted(false);
//     clearInterval(timerRef.current);
//     setTimeLeft(timeMap[selectedType]);
//     setWordCount(0);
//     textarea.value = "";
//   };

//   const handleCopyClick = () => {
//     const text = textRef.current.value.trim();
//     if (!text) return alert("Nothing to copy!");
//     navigator.clipboard
//       .writeText(text)
//       .then(() => alert("✅ Copied to clipboard!"))
//       .catch(() => alert("❌ Failed to copy!"));
//   };

//   return (
//     <div className="bg-gray-100 font-sans min-h-screen">
//       <Navbar
//         selectedType={selectedType}
//         setSelectedType={setSelectedType}
//         handleTypeChange={handleTypeChange}
//       />

//       <div className="flex flex-col sm:flex-row items-center justify-center gap-3 px-4 py-4 text-center sm:text-left">
//         <div className="text-green-600 font-bold">
//           Time left: {formatTime(timeLeft)}
//         </div>
//         <div className="text-gray-700 font-bold">Word count: {wordCount}</div>
//         <button
//           onClick={handleCopyClick}
//           className="bg-zinc-800 text-white px-3 py-1 rounded text-sm hover:bg-zinc-700 transition"
//         >
//           📋 Copy
//         </button>
//       </div>

//       <form
//         id="descriptiveForm"
//         onSubmit={handleSubmit}
//         className="mx-4 md:mx-auto max-w-2xl flex flex-col gap-4"
//       >
//         <textarea
//           ref={textRef}
//           name="prompt"
//           rows="12"
//           required
//           spellCheck="false"
//           className="w-full border border-gray-300 p-3 text-base rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
//           onFocus={() => !timerStarted && setTimerStarted(true)}
//           onInput={(e) => {
//             handleWordCount(e);
//             if (e.target.value.includes("\n\n")) {
//               e.target.value = e.target.value.replace(/\n\n+/g, "\n");
//             }
//           }}
//           onPaste={(e) => e.preventDefault()}
//           onCopy={(e) => e.preventDefault()}
//           onCut={(e) => e.preventDefault()}
//           onContextMenu={(e) => e.preventDefault()}
//           onKeyDown={(e) => {
//             const cursorAtEnd =
//               e.target.selectionStart === e.target.value.length;
//             if (
//               !cursorAtEnd &&
//               ![
//                 "Backspace",
//                 "Delete",
//                 "ArrowLeft",
//                 "ArrowRight",
//                 "Tab",
//               ].includes(e.key)
//             ) {
//               e.preventDefault();
//             }
//           }}
//         ></textarea>

//         <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-4">
//           <button
//             type="submit"
//             className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             Submit
//           </button>
//           <button
//             type="button"
//             onClick={() => window.open("https://chatgpt.com/", "_blank")}
//             className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
//           >
//             ChatGpt
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// ------------------------------------------------------------------------------------------------


import React, { useEffect, useRef, useState } from "react";
export default function Descriptive() {
  const [selectedType, setSelectedType] = useState("Letter");
  const [timeLeft, setTimeLeft] = useState(600);
  const [wordCount, setWordCount] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const timerRef = useRef(null);
  const textRef = useRef(null);

  const timeMap = {
    Letter: 600,
    Essay: 1200,
    Report: 1200,
    Email: 600,
    Situation: 600,
  };
useEffect(() => {
  console.log("🎯 Descriptive component mounted");
}, []);

  useEffect(() => {
    const savedType = sessionStorage.getItem("selectedType");
    if (savedType && timeMap[savedType]) {
      setSelectedType(savedType);
      setTimeLeft(timeMap[savedType]);
    }
  }, []);

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
  }, [timerStarted]);

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
    setSelectedType(type);
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

    const extraPrompt =
      "\n\nMarks out of 15, check spelling error, check grammar error";
    const finalText = currentText + extraPrompt;

    textarea.value = finalText;

    try {
      await navigator.clipboard.writeText(finalText);
      alert("✅ Copied to clipboard!");
    } catch (err) {
      console.warn("❌ Copy failed!", err);
      alert("❌ Copy failed! Please copy manually.");
    }

    // Reset everything
    setTimerStarted(false);
    clearInterval(timerRef.current);
    setTimeLeft(timeMap[selectedType]);
    setWordCount(0);
    textarea.value = "";
  };

  const handleCopyClick = () => {
    const text = textRef.current.value.trim();
    if (!text) return alert("Nothing to copy!");
    navigator.clipboard
      .writeText(text)
      .then(() => alert("✅ Copied to clipboard!"))
      .catch(() => alert("❌ Failed to copy!"));
  };

  return (
    <div className="bg-gray-100 font-sans min-h-screen">
      <nav className="flex flex-col md:flex-row justify-between items-center bg-blue-900 text-white px-4 py-3 text-base font-semibold gap-2">
        <div className="text-lg">Descriptive Writing</div>
        <div className="flex flex-wrap justify-center gap-2">
          {Object.keys(timeMap).map((type) => (
            <button
              key={type}
              onClick={() => handleTypeChange(type)}
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 active:bg-blue-800 transition"
            >
              {type}
            </button>
          )) }
        </div>
      </nav>

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






// import React, { useState } from "react";


// export default function Descriptive() {
//   const [selectedType, setSelectedType] = useState("Letter");
//   const timeMap = {
//     Letter: 600,
//     Essay: 1200,
//     Report: 1200,
//     Email: 600,
//     Situation: 600,
//   };

//   const handleTypeChange = (type) => {
//     setSelectedType(type);
//     sessionStorage.setItem("selectedType", type);
//   };

//   return (
//     <nav className="flex flex-col md:flex-row justify-between items-center bg-blue-900 text-white px-4 py-3 text-base font-semibold gap-2 shadow-md">
//       <div className="text-lg font-bold">Descriptive Writing</div>

//       <div className="flex flex-wrap justify-center gap-2">
//         {Object.keys(timeMap).map((type) => (
//           <button
//             key={type}
//             onClick={() => handleTypeChange(type)}
//             className={`px-4 py-2 rounded transition font-medium ${
//               selectedType === type
//                 ? "bg-green-600 hover:bg-green-700"
//                 : "bg-blue-600 hover:bg-blue-700"
//             }`}
//           >
//             {type}
//           </button>
//         ))}
//       </div>
//     </nav>
//   );
// }