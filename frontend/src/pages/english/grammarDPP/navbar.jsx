
import React from "react";

export default function Navbar({ onMobileMenu }) { // receiving props. 
  return (
    <nav className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 shadow-sm z-40">
      <div className="h-full flex items-center justify-between px-3 sm:px-6">
        <div className="flex items-center space-x-3">
          {/* Mobile hamburger */}
          <button
            onClick={onMobileMenu}
            className="w-9 h-9 rounded-md flex items-center justify-center text-gray-700 hover:bg-gray-100 lg:hidden"
            aria-label="Open sets"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>

          <div className="ml-1">
            <span className="font-bold text-lg sm:text-xl text-gray-800">
              English <span className="text-blue-600">Practice Book</span>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}