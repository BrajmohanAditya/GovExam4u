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
  { icon: faChalkboardUser, label: "Live learning", link: "#" },
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

export default function SidebarMenu() {
  const [active, setActive] = useState("Home");
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-white bg-gray-800 p-2 rounded"
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>

      {/* Sidebar */}
      <div
        className={`min-h-screen bg-black text-[#c3d0d7] fixed top-0 left-0 mt-8 overflow-y-auto py-4 px-2 z-40 transform transition-transform duration-300 ease-in-out
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-[18%] w-64`}
      >
        <ul className="space-y-2">
          {sidebarItems.map((item, index) => (
            <li
              key={index}
              className={`flex items-center gap-2 px-3 py-2 rounded transition text-sm cursor-pointer
                ${
                  active === item.label
                    ? "bg-gray-700 text-white"
                    : "hover:bg-gray-800 hover:text-white"
                }`}
              onClick={() => setActive(item.label)}
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
