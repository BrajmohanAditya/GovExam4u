
import React, { useState } from "react";
import Navbar from "./Navbar";
import SidebarMenu from "./Sidebar";

export default function HomePage() {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    //   Props Sending HomePage →Navbar:
    <>
      <Navbar setShowSidebar={setShowSidebar} /> 
      <SidebarMenu showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
    </>
  );
}

/*

* jo component state manage karta hai — wo parent hota hai by React philosophy.
* React Data Flow = Top to Bottom Only

🔗 Connection Flow (Indirect Link):
Tum click karte ho → Navbar ke andar button par.

Wo call karta hai: setShowSidebar(prev => !prev)
👉 Ye function HomePage se props ke zariye aaya hai.

Iska effect HomePage ke state pe hota hai (showSidebar update).

Phir HomePage dubara render hota hai, aur SidebarMenu ko naya showSidebar value milta hai.

SidebarMenu me CSS class change hoti hai → aur toggle ho jaata hai.

*/