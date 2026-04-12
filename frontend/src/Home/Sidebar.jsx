import React, { useState } from "react";
import {
  Home,
  Users,
  FileText,
  PlayCircle,
  List,
  BookOpen,
  Newspaper,
  ShoppingCart,
  Gift,
  Star,
  Calendar,
  MessageSquare,
  Youtube,
  Settings,
  Send,
} from "lucide-react";
import { sidebarStyles } from "./style";

const sidebarItems = [
  { icon: Home, label: "Home", link: "#" },
  { icon: Users, label: "Live Classes", link: "#" },
  { icon: FileText, label: "Mock Test", link: "#" },
  {
    icon: PlayCircle,
    label: "Live Mock",
    link: "#/livemock",
  },
  {
    icon: List,
    label: "To-Do List",
    link: "#todo-list",
  },
  {
    icon: BookOpen,
    label: "Descriptive Writing",
    link: "#/descriptive",
  },
  { icon: Newspaper, label: "Current Affair", link: "#/" },
  { icon: FileText, label: "Daily Quiz", link: "#/" },
  { icon: Calendar, label: "Track Your Exam", link: "#/examTracker" },
  { icon: Gift, label: "Win Prize", link: "#" },
  { icon: Star, label: "Our Selections", link: "#" },
  { icon: ShoppingCart, label: "Purchased Item", link: "#" },
  {
    icon: MessageSquare,
    label: "whatsApp",
    link: "https://chat.whatsapp.com/EF6x76bLnSe47jBOvzIuGe",
  },
  {
    icon: Youtube,
    label: "YouTube",
    link: "https://www.youtube.com/@silenttravler1632",
  },
  {
    icon: Send,
    label: "Telegram",
    link: "https://t.me/+K5o2Ti1aRZdlNDY9",
  },
  { icon: Settings, label: "Setting", link: "#/password/forgot" },
];

export default function SidebarMenu({ showSidebar, setShowSidebar }) {
  const [active, setActive] = useState("Home");

  return (
    <>
      {/* mobile mode meh ab ager kahi v click karo toh side bar hide ho jayaga */}
      {showSidebar && (
        <>
          <div
            className="fixed inset-0 sm:hidden z-30"
            onClick={() => setShowSidebar(false)} // backdrop click → sidebar close
          ></div>

          {/* Sidebar ka background black */}
          <div className="fixed top-0 left-0 h-full w-64 bg-black sm:hidden z-40"></div>
        </>
      )}

      <div
        className={sidebarStyles(showSidebar).sidebar}
        style={{
          scrollbarGutter: "stable", // optional for better layout when scroll appears, top-14
          height: "calc(100vh - var(--navbar-height))",
        }}
      >
        <ul className="space-y-2">
          {sidebarItems.map((item, index) => (
            <li
              key={index}
              className={`flex items-center gap-2 px-3 py-2 rounded transition text-lg cursor-pointer
              ${active === item.label
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
              {typeof item.icon === "string" ? (
                <span className="inline-flex items-center justify-center w-4 mr-2">
                  {item.icon}
                </span>
              ) : (
                <span className="inline-flex items-center justify-center w-4 mr-2">
                  {(() => {
                    const Icon = item.icon;
                    return (
                      <Icon
                        size={18}
                        className={`${active === item.label
                          ? "text-[#45f3f3]"
                          : "text-[#45f3f3]"
                          }`}
                      />
                    );
                  })()}
                </span>
              )}

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
