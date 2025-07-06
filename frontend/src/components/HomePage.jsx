
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
