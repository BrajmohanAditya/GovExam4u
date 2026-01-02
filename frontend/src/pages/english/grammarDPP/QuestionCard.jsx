
import React from "react";
import Options from "./Options";

export default function QuestionCard({
  question,
  questionIndex,
  total,
  selected, // ✅ number (index)
  onSelectOption, // ✅ expects index
  onNext,
  onPrev,
  readOnly = false,
  instantFeedback = false,
  locked = false,
  reveal = false,
  showExplanationProp = true,
}) {
  if (!question) return null;

  const showExplanation = readOnly || (reveal && showExplanationProp);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-md shadow-sm">
      <div className="mb-3">
        <h3 className="text-sm text-gray-500">
          Question {questionIndex + 1} of {total}
        </h3>
        <p className="text-base sm:text-lg font-medium mt-2 text-gray-900">
          {question.question}
        </p>
      </div>

      <div className="mb-4">
        <Options
          options={question.options}
          selected={selected} // ✅ index
          onSelect={onSelectOption} // ✅ index
          readOnly={readOnly}
          instantFeedback={instantFeedback}
          locked={locked}
          correctAnswerIndex={question.correctAnswerIndex} // ✅ FIX
          reveal={reveal}
        />
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={onPrev}
            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:opacity-50 text-sm"
            disabled={questionIndex === 0}
          >
            Previous
          </button>

          <button
            onClick={onNext}
            className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 text-sm"
            disabled={questionIndex === total - 1}
          >
            Next
          </button>
        </div>

        <div className="text-sm text-gray-500">Select one option</div>
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className="mt-4 p-3 bg-gray-50 border rounded">
          <div className="text-sm text-gray-700">
            <strong>Explanation:</strong>
            <p className="mt-2">{question.explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
}
