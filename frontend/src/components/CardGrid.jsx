

// import React from "react";

// export default function CardGrid() {
//   return (
//     <div className="p-4 flex flex-wrap gap-6">
//       <div className="bg-blue-600  rounded-lg shadow-md p-4 w-64">
//         <h3 className="text-xl font-semibold mb-2">Mock Test</h3>
//         <p className="text-gray-600">Total Sets: 10</p>
//         <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition">
//           Start
//         </button>
//       </div>

//     </div>
//   );
// } 

import React from "react";
import { Link } from "react-router-dom";

export default function CardGrid() {
  return (
    <div className="p-4 flex flex-wrap gap-6">
      <Link to="/mocktest" className="no-underline">
        <div className="bg-blue-600 rounded-lg shadow-md p-4 w-64 cursor-pointer hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2 text-white">Mock Test</h3>
          <p className="text-gray-200">Total Sets: 10</p>
        </div>
      </Link>
    </div>
  );
}
