
"use client";

export default function Options({
  options = [],
  selected,
  onSelect,
  readOnly = false,
  instantFeedback = false,
  locked = false,
  correctAnswerIndex = null,
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
          "w-full text-left px-5 py-4 rounded-xl border-[1.5px] flex items-center justify-between transition-all duration-200 group relative overflow-hidden";
        let labelClasses =
          "w-9 h-9 rounded-lg flex items-center justify-center font-bold flex-shrink-0 transition-colors shadow-sm z-10";
        let textClasses = "text-[15px] flex-1 z-10 transition-colors";

        if (!showFeedback) {
          if (isSelected) {
            containerClasses += " bg-indigo-50 border-indigo-500 shadow-md shadow-indigo-100/50 scale-[1.01]";
            labelClasses += " bg-indigo-600 text-white shadow-indigo-200";
            textClasses += " font-semibold text-indigo-950";
          } else {
            containerClasses +=
              " bg-white text-slate-700 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 hover:shadow-sm";
            labelClasses += " bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600";
          }
        } else {
          if (isCorrect) {
            containerClasses += " bg-emerald-50 border-emerald-400 shadow-sm shadow-emerald-100";
            labelClasses += " bg-emerald-500 text-white shadow-emerald-200";
            textClasses += " font-semibold text-emerald-900";
          } else if (isWrongSelected) {
            containerClasses += " bg-rose-50 border-rose-400 shadow-sm shadow-rose-100";
            labelClasses += " bg-rose-500 text-white shadow-rose-200";
            textClasses += " font-semibold text-rose-900";
          } else {
            containerClasses += " bg-white text-slate-500 border-slate-200 opacity-60";
            labelClasses += " bg-slate-100 text-slate-400";
          }
        }

        return (
          <div
            key={idx}
            onClick={() => {
              if (locked || readOnly || (showFeedback && reveal)) return;
              onSelect(idx);
            }}
            className={containerClasses}
            style={{ cursor: locked || readOnly ? "default" : "pointer" }}
          >
            <div className="flex items-center space-x-3">
              <div className={labelClasses}>{labels[idx]}</div>
              <div
                className={`${textClasses} prose prose-sm max-w-none [&>p]:my-0`}
                dangerouslySetInnerHTML={{ __html: opt }}
              />
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
