export const navbarStyles = {
  nav: `
    w-full bg-blue-800 sticky top-0 z-[1000] px-4 py-3
    flex flex-wrap items-center justify-between gap-3
  `,
  login: `
    flex items-center gap-2  px-3 sm:px-4 py-2 rounded-lg bg-white text-blue-800 text-sm sm:text-base font-semibold 
    hover:bg-gray-100 transition cursor-pointer
  `,
  signup: `
    flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-green-600 text-white text-sm sm:text-base 
    font-semibold hover:bg-green-700 transition shadow cursor-pointer
  `,
};

export const sidebarStyles = (showSidebar) => ({
  sidebar: `
    fixed left-0 z-40 w-64
    bg-black text-[#c3d0d7] font-roboto 
    overflow-y-auto px-2
    
    transform transition-transform duration-300 ease-in-out

    top: "var(--navbar-height)",
    ${showSidebar ? "translate-x-0" : "-translate-x-full"}
    sm:translate-x-0
  `,
});
