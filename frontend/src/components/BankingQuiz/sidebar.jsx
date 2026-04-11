import React from "react";
import { sidebarStyle } from "../../pages/BankingQuiz/style";

export default function Sidebar({
  sets,
  currentSet,
  onSelectSet,
  isOpen,
  onClose,
  lockMap,
  liveMap,
}) {
  return (
    <>
      {/* 🔥 BACKDROP (click outside to close) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* SIDEBAR */}
      <aside
        aria-label="Quiz sets"
        className={`${sidebarStyle.container(isOpen)} z-50`}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-700">Quiz Sets</h2>
          <button
            className="lg:hidden text-gray-500 hover:text-gray-700"
            onClick={onClose}
            aria-label="Close sets"
          >
            ✕
          </button>
        </div>

        <ul className="space-y-2 px-3">
          {sets.map((s) => {
            const active = currentSet === s;
            return (
              <li key={s}>
                <button
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center justify-between transition-all duration-300 group
                    ${active
                      ? "bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200"
                      : "bg-transparent text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                    } text-sm sm:text-base font-medium`}
                  onClick={() => {
                    onSelectSet(s);
                    onClose(); // 🔥 optional: auto close after select (mobile)
                  }}
                >
                  <span className={`relative ${active ? "font-semibold" : ""}`}>
                    {s}
                    {active && (
                       <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-indigo-600 rounded-r-md"></span>
                    )}
                  </span>
                  {/* 🔒 LOCK ICON FOR THAT SET */}
                  <div className="flex items-center gap-2">
                    {lockMap?.[s] && (
                      <span className="text-red-500 text-xs bg-red-50 px-2 py-1 rounded-md opacity-80 group-hover:opacity-100 transition-opacity">🔒 Locked</span>
                    )}
                    {liveMap?.[s] && (
                      <span className="text-emerald-600 text-xs flex items-center gap-1.5 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Live
                      </span>
                    )}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
}
