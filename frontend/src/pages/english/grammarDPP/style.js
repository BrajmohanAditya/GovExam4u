export const sidebarStyle = {
  // MAIN ASIDE (dynamic)
  container: (isOpen) =>
    `fixed top-14 left-0 bottom-0 bg-white border-r border-gray-200 p-4 z-50
     overflow-y-auto transform transition-transform
     ${isOpen ? "translate-x-0" : "-translate-x-full"}
     lg:translate-x-0 w-72 sm:w-64`,


};

export const QuizIntroStyle = {
  wrapper: "w-full min-h-[50vh] flex items-center justify-center px-4",

  card:
    "w-full max-w-sm aspect-square " +
    "bg-gradient-to-br from-blue-50 via-white to-indigo-50 " +
    "rounded-2xl shadow-lg border border-blue-100 " +
    "flex flex-col items-center justify-center " +
    "p-6 sm:p-8",

  icon:
    "w-14 h-14 mb-4 rounded-full bg-yellow-400 text-white " +
    "flex items-center justify-center text-2xl shadow-md",

  heading: "text-center text-lg sm:text-xl font-semibold text-gray-800",

  description: "text-center text-sm text-gray-600 mt-3 px-2 leading-relaxed",

  prize:
    "mt-4 px-4 py-2 bg-green-100 text-green-700 " +
    "rounded-full text-sm font-medium",

  time: "mt-2 text-sm text-blue-600 font-semibold",
};

