import React from "react";
import Options from "./Options";

/*
  QuestionCard updated so the Explanation box is rendered BELOW
  the Previous / Next buttons.

  Explanation visibility rules:
    - readOnly (full review): explanation always visible
    - instantFeedback (retake mode): explanation visible only after user selects an option for that question
*/
export default function QuestionCard({
  question,
  questionIndex,
  total,
  selected,
  onSelectOption,
  onNext,
  onPrev,
  readOnly = false,
  instantFeedback = false,
  locked = false,
}) {
  if (!question) return null;

  // For instantFeedback show explanation only after user has selected an option
  const showExplanation = readOnly || (instantFeedback && selected != null);

  return (
    <div className="bg-white p-6 rounded-md shadow-sm">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-sm text-gray-500">
            Question {questionIndex + 1} of {total}
          </h3>
          <p className="text-lg font-medium mt-2 text-gray-900">
            {question.question}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <Options
          options={question.options}
          selected={selected}
          onSelect={onSelectOption}
          readOnly={readOnly}
          instantFeedback={instantFeedback}
          locked={locked}
          correctAnswer={question.correctAnswer}
        />
      </div>

      {/* Navigation buttons remain above the explanation now */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={onPrev}
            className="px-4 py-2 mr-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:opacity-50"
            disabled={questionIndex === 0}
          >
            Previous
          </button>
          <button
            onClick={onNext}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            disabled={questionIndex === total - 1}
          >
            Next
          </button>
        </div>

        <div className="text-sm text-gray-500">Select one option</div>
      </div>

      {/* Explanation placed below navigation. Visible per showExplanation rules. */}
      {showExplanation && (
        <div className="mt-6 p-4 bg-gray-50 border rounded">
          <div className="text-sm text-gray-700">
            <strong>Explanation:</strong>
            <p className="mt-2">{question.explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
}
