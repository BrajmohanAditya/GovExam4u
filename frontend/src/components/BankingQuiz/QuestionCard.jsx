

"use client";
import Options from "./Options";

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
  reveal = false,
  showExplanationProp = true,
}) {
  if (!question) return null;

  const showExplanation = readOnly || (reveal && showExplanationProp);

  const isComprehension = Boolean(question.passage);

  const QuestionContent = (
    <>
      <div className="mb-3">
        <h3 className="text-sm text-gray-500">
          Question {questionIndex + 1} of {total}
        </h3>
        <div
          className="text-base sm:text-lg font-medium mt-2 text-gray-900 prose prose-sm max-w-none [&>p]:my-1"
          dangerouslySetInnerHTML={{ __html: question.question }}
        />
      </div>

      <div className="mb-4">
        <Options
          options={question.options}
          selected={selected}
          onSelect={onSelectOption}
          readOnly={readOnly}
          instantFeedback={instantFeedback}
          locked={locked}
          correctAnswerIndex={question.correctAnswerIndex}
          reveal={reveal}
        />
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-6">
        <div className="flex items-center space-x-2">
          <button
            onClick={onPrev}
            className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-md hover:bg-gray-200 disabled:opacity-50 text-sm transition-colors"
            disabled={questionIndex === 0}
          >
            Previous
          </button>

          <button
            onClick={onNext}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 text-sm transition-colors"
            disabled={questionIndex === total - 1}
          >
            Next
          </button>
        </div>

        <div className="text-sm text-gray-500 font-medium">Select one option</div>
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-lg shadow-inner">
          <div className="text-sm text-gray-800">
            <strong className="text-green-800 mb-2 block text-base">Explanation:</strong>
            <div
              className="mt-2 prose prose-sm max-w-none [&>p]:my-1"
              dangerouslySetInnerHTML={{ __html: question.explanation }}
            />
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className={`bg-white rounded-xl shadow-sm ${isComprehension ? '' : 'p-4 sm:p-6'}`}>
      {isComprehension ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x border border-gray-200 rounded-xl overflow-hidden shadow-xs">
          {/* Left Pane: Passage */}
          <div className="p-4 sm:p-6 bg-[#f8fafc] overflow-y-auto max-h-[75vh]">
            <div className="sticky top-0 bg-[#f8fafc] pb-2 mb-4 border-b border-gray-200 z-10">
               <h2 className="text-xl font-bold text-gray-800">Reading Passage</h2>
            </div>
            <div
              className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: question.passage }}
            />
          </div>
          {/* Right Pane: Question */}
          <div className="p-4 sm:p-6 overflow-y-auto max-h-[75vh] bg-white">
            {QuestionContent}
          </div>
        </div>
      ) : (
        QuestionContent
      )}
    </div>
  );
}
