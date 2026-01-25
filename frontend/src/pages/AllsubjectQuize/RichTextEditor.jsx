// "use client";

// import { useRef, useEffect, useCallback, useState } from "react";

// const RichTextEditor = ({ value, onChange, placeholder, error }) => {
//   const editorRef = useRef(null);
//   const isInternalUpdate = useRef(false);
//   const savedSelectionRef = useRef(null);
//   const [, forceUpdate] = useState(0);

//   // Sync external value changes (e.g., form reset)
//   useEffect(() => {
//     if (editorRef.current && !isInternalUpdate.current) {
//       if (editorRef.current.innerHTML !== value) {
//         editorRef.current.innerHTML = value || "";
//       }
//     }
//     isInternalUpdate.current = false;
//   }, [value]);

//   const handleInput = useCallback(() => {
//     if (editorRef.current) {
//       isInternalUpdate.current = true;
//       onChange(editorRef.current.innerHTML);
//     }
//   }, [onChange]);

//   const saveSelection = () => {
//     const selection = window.getSelection();
//     if (selection && selection.rangeCount > 0) {
//       savedSelectionRef.current = selection.getRangeAt(0).cloneRange();
//     }
//   };

//   const restoreSelection = () => {
//     if (savedSelectionRef.current) {
//       const selection = window.getSelection();
//       selection?.removeAllRanges();
//       selection?.addRange(savedSelectionRef.current);
//     }
//   };

//   const execCommand = (command, commandValue = null) => {
//     // Restore selection before executing command
//     restoreSelection();
//     document.execCommand(command, false, commandValue);
//     editorRef.current?.focus();
//     handleInput();
//     // Force re-render to update button states
//     forceUpdate((n) => n + 1);
//   };

//   const isActive = (command) => {
//     return document.queryCommandState(command);
//   };

//   const btnClass = (command) =>
//     `px-2 py-1 rounded text-sm font-medium transition-colors ${
//       isActive(command)
//         ? "bg-blue-600 text-white"
//         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//     }`;

//   return (
//     <div
//       className={`border rounded-md overflow-hidden bg-white ${
//         error ? "border-red-500" : "border-gray-300"
//       }`}
//     >
//       {/* Toolbar */}
//       <div className="flex flex-wrap gap-1 p-2 border-b bg-gray-50">
//         <button
//           type="button"
//           onMouseDown={(e) => e.preventDefault()}
//           onClick={() => execCommand("bold")}
//           className={btnClass("bold")}
//           title="Bold (Ctrl+B)"
//         >
//           <strong>B</strong>
//         </button>
//         <button
//           type="button"
//           onMouseDown={(e) => e.preventDefault()}
//           onClick={() => execCommand("italic")}
//           className={btnClass("italic")}
//           title="Italic (Ctrl+I)"
//         >
//           <em>I</em>
//         </button>
//         <button
//           type="button"
//           onMouseDown={(e) => e.preventDefault()}
//           onClick={() => execCommand("underline")}
//           className={btnClass("underline")}
//           title="Underline (Ctrl+U)"
//         >
//           <span className="underline">U</span>
//         </button>
//         <div className="w-px bg-gray-300 mx-1" />
//         <button
//           type="button"
//           onMouseDown={(e) => e.preventDefault()}
//           onClick={() => execCommand("insertUnorderedList")}
//           className={btnClass("insertUnorderedList")}
//           title="Bullet List"
//         >
//           • List
//         </button>
//         <button
//           type="button"
//           onMouseDown={(e) => e.preventDefault()}
//           onClick={() => execCommand("insertOrderedList")}
//           className={btnClass("insertOrderedList")}
//           title="Numbered List"
//         >
//           1. List
//         </button>
//         <div className="w-px bg-gray-300 mx-1" />
//         <button
//           type="button"
//           onMouseDown={(e) => e.preventDefault()}
//           onClick={() => execCommand("undo")}
//           className="px-2 py-1 rounded text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
//           title="Undo (Ctrl+Z)"
//         >
//           ↶
//         </button>
//         <button
//           type="button"
//           onMouseDown={(e) => e.preventDefault()}
//           onClick={() => execCommand("redo")}
//           className="px-2 py-1 rounded text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
//           title="Redo (Ctrl+Y)"
//         >
//           ↷
//         </button>
//       </div>

//       {/* Editor */}
//       <div
//         ref={editorRef}
//         contentEditable
//         onInput={handleInput}
//         onSelect={saveSelection}
//         onKeyUp={saveSelection}
//         onMouseUp={saveSelection}
//         className="p-3 min-h-[100px] focus:outline-none prose prose-sm max-w-none"
//         style={{ whiteSpace: "pre-wrap" }}
//         data-placeholder={placeholder}
//         suppressContentEditableWarning
//       />

//       <style jsx>{`
//         [contenteditable]:empty:before {
//           content: attr(data-placeholder);
//           color: #9ca3af;
//           pointer-events: none;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default RichTextEditor;


"use client";

import { useRef, useEffect, useCallback, useState } from "react";

const RichTextEditor = ({ value, onChange, placeholder, error }) => {
  const editorRef = useRef(null);
  const isInternalUpdate = useRef(false);
  const savedSelectionRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    insertUnorderedList: false,
    insertOrderedList: false,
  });

  // Sync external value changes (e.g., form reset)
  useEffect(() => {
    if (editorRef.current && !isInternalUpdate.current) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || "";
      }
    }
    isInternalUpdate.current = false;
  }, [value]);

  const updateActiveFormats = useCallback(() => {
    if (!isFocused) return;
    setActiveFormats({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      insertUnorderedList: document.queryCommandState("insertUnorderedList"),
      insertOrderedList: document.queryCommandState("insertOrderedList"),
    });
  }, [isFocused]);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      isInternalUpdate.current = true;
      onChange(editorRef.current.innerHTML);
      updateActiveFormats();
    }
  }, [onChange, updateActiveFormats]);

  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      savedSelectionRef.current = selection.getRangeAt(0).cloneRange();
    }
    updateActiveFormats();
  };

  const restoreSelection = () => {
    if (savedSelectionRef.current) {
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(savedSelectionRef.current);
    }
  };

  const execCommand = (command, commandValue = null) => {
    restoreSelection();
    document.execCommand(command, false, commandValue);
    editorRef.current?.focus();
    handleInput();
    updateActiveFormats();
  };

  const handleFocus = () => {
    setIsFocused(true);
    updateActiveFormats();
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Reset active formats when editor loses focus
    setActiveFormats({
      bold: false,
      italic: false,
      underline: false,
      insertUnorderedList: false,
      insertOrderedList: false,
    });
  };

  const btnClass = (command) =>
    `px-2 py-1 rounded text-sm font-medium transition-colors ${
      activeFormats[command]
        ? "bg-blue-600 text-white"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <div
      className={`border rounded-md overflow-hidden bg-white ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    >
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b bg-gray-50">
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => execCommand("bold")}
          className={btnClass("bold")}
          title="Bold (Ctrl+B)"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => execCommand("italic")}
          className={btnClass("italic")}
          title="Italic (Ctrl+I)"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => execCommand("underline")}
          className={btnClass("underline")}
          title="Underline (Ctrl+U)"
        >
          <span className="underline">U</span>
        </button>
        <div className="w-px bg-gray-300 mx-1" />
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => execCommand("insertUnorderedList")}
          className={btnClass("insertUnorderedList")}
          title="Bullet List"
        >
          • List
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => execCommand("insertOrderedList")}
          className={btnClass("insertOrderedList")}
          title="Numbered List"
        >
          1. List
        </button>
        <div className="w-px bg-gray-300 mx-1" />
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => execCommand("undo")}
          className="px-2 py-1 rounded text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
          title="Undo (Ctrl+Z)"
        >
          ↶
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => execCommand("redo")}
          className="px-2 py-1 rounded text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
          title="Redo (Ctrl+Y)"
        >
          ↷
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onSelect={saveSelection}
        onKeyUp={saveSelection}
        onMouseUp={saveSelection}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="p-3 min-h-[100px] focus:outline-none prose prose-sm max-w-none"
        style={{ whiteSpace: "pre-wrap" }}
        data-placeholder={placeholder}
        suppressContentEditableWarning
      />

      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
