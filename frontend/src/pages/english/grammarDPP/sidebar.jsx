
import React from "react";

export default function Sidebar({ sets, currentSet, onSelectSet, isOpen, onClose }) {
  // Keep sidebar fixed on all screen sizes.
  // On small screens it will translate-left when closed; on lg screens it stays visible.
  return (
    <>
      {/* mobile overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity lg:hidden ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      <aside
        className={`fixed top-14 left-0 bottom-0 w-64 bg-gray-50 border-r p-4 z-50 transform transition-transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="mb-4">
          <h2 className="text-sm font-medium text-gray-700">Quiz Sets</h2>
        </div>
        <ul className="space-y-2">
          {sets.map((s) => {
            const active = currentSet === s;
            return (
              <li key={s}>
                <button
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between
                    ${active ? "bg-blue-600 text-white" : "bg-white text-gray-800 hover:bg-gray-100"}`}
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