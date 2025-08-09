

import React from "react";
import { useParams } from "react-router-dom";
import { QuestionData } from "./questions";

export default function QuestionPage({ type }) {
  // const { type } = useParams(); 
  const questions = QuestionData[type] || [];

  return (
    <div className="min-h-screen bg-gray-100 px-4 md:px-5">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-semibold text-blue-700 mb-6 border-b pb-2">
          {type} Questions for practice
        </h1>

        {questions.length === 0 ? (
          <p className="text-gray-500">No questions available for this type.</p>
        ) : (
          <ul className="list-decimal list-inside space-y-3 text-lg text-gray-800">
            {questions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

