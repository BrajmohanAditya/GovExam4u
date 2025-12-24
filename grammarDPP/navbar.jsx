// import React from "react";

// export default function Navbar({ onMobileMenu }) {
//   return (
//     <nav className="fixed top-0 left-0 right-0 h-14 bg-white border-b z-40">
//       <div className="h-full flex items-center justify-between px-3 sm:px-6">
//         <div className="flex items-center space-x-3">
//           {/* Mobile hamburger: visible on small screens, hidden on lg+ */}
//           <button
//             onClick={onMobileMenu}
//             className="w-9 h-9 rounded-md flex items-center justify-center text-gray-700 hover:bg-gray-100 lg:hidden"
//             aria-label="Open sets"
//           >
//             <svg
//               className="w-5 h-5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M4 6h16M4 12h16M4 18h16"
//               ></path>
//             </svg>
//           </button>

//           <div className="ml-1">
//             <span className="font-semibold text-gray-800">
//               English <span className="text-blue-600">Practice Book</span>
//             </span>
//           </div>
//         </div>

//         <div className="flex-1 flex items-center justify-end pr-2 sm:pr-6">
//           <h1 className="text-base sm:text-lg font-semibold tracking-wider">
//             QUIZ APP
//           </h1>
//         </div>
//       </div>
//     </nav>
//   );
// }
import React from "react";

export default function Navbar({ onMobileMenu }) {
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
            <span className="font-semibold text-gray-800">
              English <span className="text-blue-600">Practice Book</span>
            </span>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-end pr-2 sm:pr-6">
          <h1 className="text-base sm:text-lg font-semibold tracking-wider text-gray-700">
            QUIZ APP
          </h1>
        </div>
      </div>
    </nav>
  );
}