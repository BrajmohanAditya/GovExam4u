
import React from "react";
import { Link } from "react-router-dom";

export default function CardGrid() {
  return (
    <div className="p-4 flex flex-wrap gap-6 ">
      {/* ✅ Descriptive Card - uses React Router Link */}
      <Link to="/descriptive" className="no-underline">
        <div className="card-wrapper ">
          <img
            src="/assets/descriptive.png"
            alt="Descriptive"
            className="w-52 h-52 object-cover mx-auto rounded"
          />
        </div>
      </Link>

      <Link to="/mock" className="no-underline">
        <div className="bg-blue-600 rounded-lg shadow-md p-4 w-52 cursor-pointer hover:shadow-lg transition h-52 card-wrapper">
          <h3 className="text-xl font-semibold mb-2 text-white">Mock Test</h3>
          <p className="text-gray-200">Total Sets: 10</p>
        </div>
      </Link>

      <Link to="/examTracker" className="no-underline">
        <div className="bg-blue-600 rounded-lg shadow-md p-4 w-52 cursor-pointer hover:shadow-lg transition h-52 card-wrapper">
          <h3 className="text-xl font-semibold mb-2 text-white">Track Exam</h3>
          <p className="text-gray-200">Track Exam</p>
        </div>
      </Link>
    </div>
  );
}


/*
Jab user uspe click karta hai, toh ye browser ke URL ko /descriptive mein change kar deta hai bina page reload kare.
Agar URL /descriptive hai, toh mujhe <Descriptive /> component screen par render karna hai.
*/