
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

      <Link to="/examTracker" className="no-underline">
        <div className=" card-wrapper">
          <img
            src="/assets/examTracker.png"
            alt="Descriptive"
            className="w-52 h-52 object-cover mx-auto rounded"
          />
        </div>
      </Link>
    </div>
  );
}


/*
Jab user uspe click karta hai, toh ye browser ke URL ko /descriptive mein change kar deta hai bina page reload kare.
Agar URL /descriptive hai, toh mujhe <Descriptive /> component screen par render karna hai.
*/