import React from "react";

/*
  Options component:
  - interactive (default): clickable single-selection
  - readOnly: full review (shows correct + user wrong immediately)
  - instantFeedback: retake-mode — show feedback only after user selects this question (selected != null)
  - locked: disables further clicks on this question
*/
export default function Options({
  options = [],
  selected,
  onSelect,
  readOnly = false,
  instantFeedback = false,
  locked = false,
  correctAnswer = null,
}) {
  const labels = ["A", "B", "C", "D"];

  if (!options || options.length === 0) {
    return <div className="text-sm text-red-600">No options available</div>;
  }

  // For instantFeedback, only show feedback once user made a selection (selected !== null/undefined)
  const showFeedback = readOnly || (instantFeedback && selected != null);

  return (
    <div className="grid grid-cols-1 gap-3">
      {options.map((opt, idx) => {
        const isSelected = selected === opt;
        const isCorrect = showFeedback && correctAnswer === opt;
        const isWrongSelected =
          showFeedback && isSelected && correctAnswer !== opt;

        let containerClasses =
          "w-full text-left px-4 py-3 rounded-md border flex items-center justify-between space-x-3 transition-colors";
        let leftClasses = "flex items-center space-x-3";
        let labelClasses =
          "w-8 h-8 rounded-full flex items-center justify-center font-semibold";
        let textClasses = "text-sm flex-1";

        if (!showFeedback) {
          // interactive mode / before feedback
          if (isSelected) {
            containerClasses += " bg-blue-600 text-white border-blue-600";
            labelClasses += " bg-white text-blue-600";
          } else {
            containerClasses +=
              " bg-white text-gray-800 hover:bg-gray-50 border-gray-200";
            labelClasses += " bg-gray-200 text-gray-700";
          }
        } else {
          // show feedback (either readOnly or instantFeedback after selection)
          if (isCorrect) {
            containerClasses += " bg-green-50 border-green-300 text-green-800";
            labelClasses += " bg-green-600 text-white";
            textClasses += " font-medium";
          } else if (isWrongSelected) {
            containerClasses += " bg-red-50 border-red-300 text-red-800";
            labelClasses += " bg-red-600 text-white";
            textClasses += " font-medium";
          } else {
            containerClasses += " bg-white text-gray-800 border-gray-200";
            labelClasses += " bg-gray-200 text-gray-700";
          }
        }

        const icon = isCorrect ? "✓" : isWrongSelected ? "✕" : "";

        return (
          <div
            key={idx}
            onClick={() => {
              if (locked || readOnly) return;
              if (onSelect) onSelect(opt);
            }}
            role={locked || readOnly ? "presentation" : "button"}
            className={containerClasses}
            style={{ cursor: locked || readOnly ? "default" : "pointer" }}
          >
            <div className={leftClasses}>
              <div className={labelClasses}>{labels[idx] ?? "?"}</div>
              <div className={textClasses}>{opt}</div>
            </div>

            <div className="w-8 text-right">
              {showFeedback && icon && (
                <span
                  className={`${
                    isCorrect ? "text-green-700" : "text-red-700"
                  } font-bold`}
                >
                  {icon}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
