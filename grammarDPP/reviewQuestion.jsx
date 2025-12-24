

import React from "react";
import Options from "./Options";

/*
  ReviewQuestion uses Options in readOnly mode.
  It displays:
  - question text
  - options with correct/wrong highlighting
  - explanation below
*/
export default function ReviewQuestion({ q, selected }) {
  return (
    <div className="bg-white p-5 rounded-md shadow-sm mb-4">
      <div className="mb-2">
        <h4 className="text-sm text-gray-500">Question</h4>
        <h3 className="font-medium mt-1 text-gray-800">{q.question}</h3>
      </div>

      <div className="mb-4">
        <Options
          options={q.options}
          selected={selected ?? null}
          readOnly={true}
          correctAnswer={q.correctAnswer}
        />
      </div>

      <div className="mt-3 p-3 bg-gray-50 border rounded">
        <div className="text-sm text-gray-700">
          <strong>Explanation:</strong>
          <p className="mt-2">{q.explanation}</p>
        </div>
      </div>
    </div>
  );
}