
// jo comment out kiya hu bahut imp function hai next page k liya

import React from "react";
import { timeMap } from "./TimeControle";

export default function Navbar({ selectedType, handleTypeChange }) {
  return (
    <nav className="flex flex-col md:flex-row justify-between items-center bg-blue-900 text-white px-4 py-3 text-base font-semibold gap-2 shadow-md">
      <strong className="text-2xl font-bold">Descriptive Writing</strong>

      <div className="flex flex-wrap justify-center gap-1 cursor-pointer">
        {Object.keys(timeMap).map((type) => (
          <span
            key={type}
            onClick={() => handleTypeChange(type)}
            className={`px-4 py-2 rounded transition font-medium ${
              selectedType === type
                ? "text-green-400 font-semibold border-b-2 border-green-400"
                : "text-white hover:text-green-300"
            }`}
          >
            {type}
          </span>
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

