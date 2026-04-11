

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
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-wider ring-1 ring-indigo-200/50 shadow-sm">
            Question {questionIndex + 1} <span className="opacity-50 mx-1">/</span> {total}
          </span>
        </div>
        <div
          className="text-lg sm:text-[1.1rem] leading-relaxed font-medium text-slate-800 prose max-w-none [&>p]:mb-2"
          dangerouslySetInnerHTML={{ __html: question.question }}
        />
      </div>

      <div className="mb-8">
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-8 pt-6 border-t border-slate-100">
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button
            onClick={onPrev}
            className="flex-1 sm:flex-none px-5 py-2.5 bg-white border border-slate-200 text-slate-600 font-medium rounded-xl hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98] disabled:opacity-40 disabled:active:scale-100 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm"
            disabled={questionIndex === 0}
          >
            ← Previous
          </button>

          <button
            onClick={onNext}
            className="flex-1 sm:flex-none px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 text-sm transition-all shadow-md shadow-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            disabled={questionIndex === total - 1}
          >
            Next →
          </button>
        </div>

        <div className="text-xs font-medium text-slate-400 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100 text-center">
          <span className="hidden sm:inline">Please </span>select one option to continue
        </div>
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className="mt-8 p-5 bg-gradient-to-br from-emerald-50 to-teal-50/30 border border-emerald-100 rounded-2xl shadow-inner shadow-emerald-50/50 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-400"></div>
          <div className="text-sm text-slate-700">
            <strong className="text-emerald-800 mb-2 flex items-center gap-2 text-base">
              <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Solution Explanation
            </strong>
            <div
              className="mt-3 prose prose-sm max-w-none text-slate-600 leading-relaxed [&>p]:mb-2"
              dangerouslySetInnerHTML={{ __html: question.explanation }}
            />
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className={`bg-white rounded-[1.25rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/60 overflow-hidden transition-all duration-300 ${isComprehension ? '' : 'p-6 sm:p-8'}`}>
      {isComprehension ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:divide-x lg:divide-slate-200/60 h-[70vh] lg:h-[75vh]">
          {/* Left Pane: Passage */}
          <div className="bg-[#f8fafc] flex flex-col h-full overflow-hidden relative">
            <div className="px-6 py-4 bg-[#f8fafc]/90 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-20 shadow-sm shadow-slate-100/50 flex justify-between items-center">
               <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2.5">
                 <span className="w-1.5 h-5 bg-indigo-500 rounded-full shadow-sm"></span>
                 Reading Passage
               </h2>
               <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold bg-white px-2 py-1 rounded-md border border-slate-200 shadow-sm">
                  Context
               </div>
            </div>
            <div className="p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent h-full pb-10">
              <div
                className="prose prose-slate max-w-none text-slate-700/90 leading-[1.8] text-[15px] font-medium"
                dangerouslySetInnerHTML={{ __html: question.passage }}
              />
            </div>
          </div>
          {/* Right Pane: Question */}
          <div className="flex flex-col h-full overflow-hidden bg-white relative">
            <div className="p-6 sm:p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent h-full">
              {QuestionContent}
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto w-full">
          {QuestionContent}
        </div>
      )}
    </div>
  );
}
