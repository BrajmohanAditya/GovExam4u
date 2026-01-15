

import React from "react";
import { sidebarStyle } from "./style";

export default function Sidebar({
  sets,
  currentSet,
  onSelectSet,
  isOpen,
  onClose,
  isLocked,
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

        <ul className="space-y-3">
          {sets.map((s) => {
            const active = currentSet === s;
            return (
              <li key={s}>
                <button
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between
                    ${
                      active
                        ? "bg-blue-600 text-white shadow"
                        : "bg-white text-gray-800 hover:bg-gray-100"
                    } text-lg`}
                  onClick={() => {
                    onSelectSet(s);
                    onClose(); // 🔥 optional: auto close after select (mobile)
                  }}
                >
                  <span>{s}</span>
                  {/* 🔒 ONLY CURRENT SET */}
                  {currentSet === s && isLocked && (
                    <span className="text-red-600 text-sm">🔒</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
}
