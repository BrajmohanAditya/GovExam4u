import React, { useState } from "react";
import { timeMap } from "./TimeControle";
import { Link } from "react-router-dom";

export default function Navbar({ selectedType, handleTypeChange }) {

  return (
    <nav className="flex flex-col md:flex-row justify-between items-center bg-blue-900 text-white px-4 py-3 text-base font-semibold gap-2 shadow-md">
      <div className="text-lg font-bold">Descriptive Writing</div>

      <div className="flex flex-wrap justify-center gap-2">
        {Object.keys(timeMap).map((type) => (
          <Link to={`/questions/${type}`} key={type}>
          <button
            key={type}
            onClick={() => handleTypeChange(type)}
            className={`px-4 py-2 rounded transition font-medium ${
              selectedType === type
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {type}
          </button>
          </Link>
        ))}
      </div>
    </nav>
  );
}

/*
  Object.keys(timeMap).map((type) => (
  <button key={type}>{type}</button>
  ))

 timeMap object se sirf keys  nikalo or .map sb per iterate karega. 

 */

