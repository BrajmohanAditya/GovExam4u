
import React from "react";

export default function Sidebar({
  sets,
  currentSet,
  onSelectSet,
  isOpen,
  onClose,
}) {
  return (
    <>
      {/* Slide-over sidebar (no dark full-screen overlay) */}
      <aside
        aria-label="Quiz sets"
        className={`fixed top-14 left-0 bottom-0 bg-white border-r border-gray-200 p-4 z-50 transform transition-transform
          ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 w-72 sm:w-64`}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-700">Quiz Sets</h2>
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
                        : "bg-white text-gray-800 hover:bg-gray-50"
                    } text-sm`}
                  onClick={() => onSelectSet(s)}
                >
                  <span>{s}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
}