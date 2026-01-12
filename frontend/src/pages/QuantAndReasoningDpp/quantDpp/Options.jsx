

export default function Options({
  options = [],
  selected, // number (index)
  onSelect,
  readOnly = false,
  instantFeedback = false,
  locked = false,
  correctAnswerIndex = null, // ✅ NUMBER
  reveal = false,
}) {
  const labels = ["A", "B", "C", "D", "E"];

  if (!options || options.length === 0) {
    return <div className="text-sm text-red-600">No options available</div>;
  }

  const showFeedback =
    readOnly || reveal || (instantFeedback && selected !== null);

  return (
    <div className="grid grid-cols-1 gap-3">
      {options.map((opt, idx) => {
        const isSelected = selected === idx;
        const isCorrect = showFeedback && correctAnswerIndex === idx;
        const isWrongSelected =
          showFeedback && isSelected && correctAnswerIndex !== idx;

        let containerClasses =
          "w-full text-left px-4 py-3 rounded-md border flex items-center justify-between transition-colors";
        let labelClasses =
          "w-8 h-8 rounded-full flex items-center justify-center font-semibold flex-shrink-0";
        let textClasses = "text-sm flex-1";

        if (!showFeedback) {
          if (isSelected) {
            containerClasses += " bg-blue-600 text-white border-blue-600";
            labelClasses += " bg-white text-blue-600";
          } else {
            containerClasses +=
              " bg-white text-gray-800 hover:bg-gray-50 border-gray-200";
            labelClasses += " bg-gray-200 text-gray-700";
          }
        } else {
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

        return (
          <div
            key={idx}
            onClick={() => {
              if (locked || readOnly || (showFeedback && reveal)) return;
              onSelect(idx); // ✅ PASS INDEX
            }}
            className={containerClasses}
            style={{ cursor: locked || readOnly ? "default" : "pointer" }}
          >
            <div className="flex items-center space-x-3">
              <div className={labelClasses}>{labels[idx]}</div>
              <div className={textClasses}>{opt}</div>
            </div>

            {showFeedback && (
              <div className="w-8 text-right font-bold">
                {isCorrect && "✓"}
                {isWrongSelected && "✕"}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
