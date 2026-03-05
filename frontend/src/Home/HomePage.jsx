
import React, { useState } from "react";
import SidebarMenu from "./Sidebar";
import CardGrid from "./CardGrid";
import Navbar from "./Navbar";

export default function HomePage() {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    //   Props Sending HomePage →Navbar:
    <>
      <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} /> 

      <SidebarMenu showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      <div className="pl-0 sm:pl-64 transition-all duration-300"> 
        <CardGrid />
      </div>
    </>
  );
}

