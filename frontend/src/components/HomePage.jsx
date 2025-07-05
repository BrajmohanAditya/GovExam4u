// src/pages/HomePage.jsx
// import React from "react";
// import Navbar from "../components/Navbar";
// import SidebarMenu from "./Sidebar";

// export default function HomePage() {
//   return (
//     <>
//       <Navbar />
//       <SidebarMenu/>
//     </>
//   );
// }
// src/components/HomePage.jsx
import React, { useState } from "react";
import Navbar from "./Navbar";
import SidebarMenu from "./Sidebar";

export default function HomePage() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <Navbar setShowSidebar={setShowSidebar} />
      <SidebarMenu
        showSidebar={showSidebar} // 👈 Pass showSidebar
        setShowSidebar={setShowSidebar} // 👈 And setter
      />
    </>
  );
}
