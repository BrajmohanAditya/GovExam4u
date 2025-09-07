import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faChalkboardUser,
  faFileSignature,
  faFileCircleQuestion,
  faBookOpenReader,
  faNewspaper,
  faCartShopping,
  faHandHoldingDollar,
  faAddressCard,
  faCircleQuestion,
  faCalendarDays,
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
  {
    icon: faCircleQuestion,
    label: "Doubt Support",
    link: "#",
  },
  {
    icon: faBookOpenReader,
    label: "Descriptive Writing",
    link: "/descriptive",
  },
  { icon: faNewspaper, label: "Current Affair", link: "#" },
  { icon: faFileSignature, label: "Daily Quiz", link: "#" },
  { icon: faCalendarDays, label: "Track Your Exam", link: "/examTracker" },
  { icon: faHandHoldingDollar, label: "Win Prize", link: "#" },
  { icon: faRocketchat, label: "Discuss Forum", link: "#" },
  { icon: faAddressCard, label: "Our Selections", link: "#" },
  { icon: faCartShopping, label: "Purchased Item", link: "#" },
  {
    icon: faSquareWhatsapp,
    label: "whatsApp",
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
      {showSidebar && (
        <>
          {/* Transparent overlay (clickable) */}
          <div
            className="fixed inset-0 sm:hidden z-30"
            onClick={() => setShowSidebar(false)} // backdrop click → sidebar close
          ></div>

          {/* Sidebar ka background black */}
          <div className="fixed top-0 left-0 h-full w-64 bg-black sm:hidden z-40"></div>
        </>
      )}

      <div
        className={` 
          fixed top-11 left-0 z-40 w-64  h-[calc(100vh-55px)]   sm:h-[calc(100vh-45px)] bg-black text-[#c3d0d7] font-roboto overflow-y-auto  px-2  pt-32 pb-25 sm:pb-6 sm:pt-6
          transform transition-transform duration-300 ease-in-out
          ${showSidebar ? "translate-x-0" : "-translate-x-full"} 
          sm:translate-x-0
          
        `}
        style={{
          scrollbarGutter: "stable", // optional for better layout when scroll appears
        }}
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
              onClick={() => {
                // toggle
                setActive(item.label);
                if (window.innerWidth < 640) {
                  setShowSidebar(false);
                }
              }}
            >
              <FontAwesomeIcon
                icon={item.icon}
                className={`w-4 ${
                  active === item.label ? "text-[#45f3f3]" : "text-[#45f3f3]"
                }`}
              />
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

> "item" ek object hai jisme 3 cheezein hoti hain: icon, label, link

* User onClick karta hai kisi menu item pe.

* setActive(item.label) call hota hai.

* React active state ko update karta hai.

* Component re-renders hota hai new active value ke saath.

* Conditional class (bg-gray-700 text-white) apply hoti hai active item pe

* Bydefault active meh home para hai. 

Har item ke liye active === item.label alag se check hota hai. Sirf active wale ko true wala milega, baaki sabko else part (hover classes) milta hai. 
Isliye baaki bhi execute hote hain — apna apna result leke. Qki it is inside loop so all elements will
come with their propert. 

Tumne kuch click kiya ho ya nahi — default active = "Home" se ek item pehle se hi active hota hai. 
Toh active vs inactive ka game tab se chalu hai.

*/