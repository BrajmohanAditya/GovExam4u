import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar({ onMobileMenu }) {
  const navigate = useNavigate();

  const { user, loading } = useSelector((state) => state.user);

  return (
    <nav className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 shadow-sm z-40">
      <div className="h-full flex items-center justify-between px-3 sm:px-6">
        {/* Left: hamburger + brand */}
        <div className="flex items-center space-x-3">
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
              />
            </svg>
          </button>

          <div className="ml-1">
            <span className="font-bold text-lg sm:text-xl text-gray-800">
              Daily <span className="text-blue-600">Practice Book</span>
            </span>
          </div>
        </div>

        {/* Right: Add Quiz button */}
        <div className="flex items-center">
          {/* Optional: loading state */}
          {loading && (
            <span className="text-sm text-gray-500 mr-3">Loading...</span>
          )}

          {/* {["admin", "editor"].includes(user?.role?.toLowerCase()) && ( */}
          <button
            onClick={() => navigate("/admin/allSubjectQuize/add-Quize")}
            className="inline-flex items-center gap-2 px-3 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            type="button"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="hidden sm:inline">Add Quiz</span>
          </button>
          {/* )} */}
        </div>
      </div>
    </nav>
  );
}
