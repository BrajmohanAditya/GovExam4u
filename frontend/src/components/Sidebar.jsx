import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faChalkboardUser,
  faFileSignature,
  faFileCircleQuestion,
  faQuestion,
  faMicrophone,
  faBookOpenReader,
  faNewspaper,
  faCartShopping,
  faHandHoldingDollar,
  faAddressCard,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import {
  faSquareWhatsapp,
  faYoutube,
  faTelegram,
  faRocketchat,
} from "@fortawesome/free-brands-svg-icons";

const sidebarItems = [
  { icon: faHouse, label: "Home", link: "#" },
  { icon: faChalkboardUser, label: "Live Classes", link: "#" },
  { icon: faFileSignature, label: "Mock Test", link: "#" },
  {
    icon: faFileCircleQuestion,
    label: "Live Mock",
    link: "MockTest/liveMock.html",
  },
  { icon: faQuestion, label: "Doubt Support", link: "#" },
  { icon: faMicrophone, label: "Make Voice Note", link: "VoiceNotes.html" },
  { icon: faBookOpenReader, label: "Revision", link: "e vocab Book.html" },
  { icon: faNewspaper, label: "Current Affair", link: "#" },
  { icon: faFileSignature, label: "Daily Quiz", link: "#" },
  { icon: faCartShopping, label: "Purchased Item", link: "#" },
  { icon: faFileCircleQuestion, label: "Exam", link: "#" },
  { icon: faHandHoldingDollar, label: "Win Prize", link: "#" },
  { icon: faRocketchat, label: "Discuss Forum", link: "#" },
  { icon: faAddressCard, label: "Our Selections", link: "#" },
  {
    icon: faSquareWhatsapp,
    label: "Connect Us",
    link: "https://chat.whatsapp.com/EF6x76bLnSe47jBOvzIuGe",
  },
  {
    icon: faYoutube,
    label: "YouTube",
    link: "https://www.youtube.com/@silenttravler1632",
  },
  {
    icon: faTelegram,
    label: "Telegram",
    link: "https://t.me/+K5o2Ti1aRZdlNDY9",
  },
];


export default function SidebarMenu({ showSidebar, setShowSidebar }) { // prop receiving
  //
  const [active, setActive] = useState("Home");
  return (
    <>
      <div
        className={` 
          fixed top-11 left-0 z-40 w-64 h-[calc(100vh-2.75rem)] bg-black text-[#c3d0d7] font-roboto overflow-y-auto  px-2  pt-32 sm:pt-6
          transform transition-transform duration-300 ease-in-out
          ${showSidebar ? "translate-x-0" : "-translate-x-full"} 
          sm:translate-x-0
          
        `} // toggle
      >
        <ul className="space-y-2">
          {sidebarItems.map((item, index) => (
            <li
              key={index}
              className={`flex items-center gap-2 px-3 py-2 rounded transition text-lg cursor-pointer
              ${
                active === item.label
                  ? "bg-gray-700 text-white"
                  : "hover:bg-gray-800 hover:text-white"
              }`}
              onClick={() => { // toggle
                setActive(item.label);
                if (window.innerWidth < 640) {
                  setShowSidebar(false);
                }
              }}
            >
              <FontAwesomeIcon icon={item.icon} className="w-4" />
              <a
                href={item.link}
                target={item.link.startsWith("http") ? "_blank" : "_self"}
                rel="noreferrer"
                className="hover:text-white"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}







/*
🧠 .map() ka kaam hai: ek array ke har item ko leke, uske upar koi kaam karna — jaise display karna, convert karna, ya element banana.
Aapke sidebar me bhi wahi ho raha hai — har item ke liye ek li ban raha hai.

> item ek object hai jisme 3 cheezein hoti hain: icon, label, link

* User onClick karta hai kisi menu item pe.

* setActive(item.label) call hota hai.

* React active state ko update karta hai.

* Component re-renders hota hai new active value ke saath.

* Conditional class (bg-gray-700 text-white) apply hoti hai active item pe

* Bydefault active meh home para hai. 

*/