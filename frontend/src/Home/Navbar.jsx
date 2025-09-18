import React from "react";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { GraduationCap } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LogIn, UserPlus, LogOut } from "lucide-react";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <GraduationCap className="h-9 w-9 text-white" />
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-sans tracking-wide">
        <span className="text-white">Gov</span>
        <span className="text-orange-500">Exam4u</span>
      </h1>
    </div>
  );
}

export default function Navbar({ showSidebar, setShowSidebar }) {
  const navigate = useNavigate();
  // prop receiving
  return (
    <>
      <nav className="w-full  bg-blue-800 sticky top-0 z-[1000] px-4 py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="w-auto flex items-center gap-x-2 sm:justify-start">
          {/* 👇 Hamburger button */}
          <button
            className="sm:hidden p-2 text-white"
            onClick={() => setShowSidebar((prev) => !prev)} //
          >
            {/* <FontAwesomeIcon icon={faBars} className="text-xl" /> */}
            <FontAwesomeIcon
              icon={showSidebar ? faTimes : faBars}
              className="text-xl"
            />
          </button>
          <Logo />
        </div>
        <form className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
          <input
            type="search"
            placeholder="Search"
            className="border border-gray-300 rounded w-full sm:w-[36rem] h-10 px-2 bg-white"
          />

          <Button
            size="large"
            style={{ backgroundColor: "#ff5722", color: "white" }}
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </form>
        <div className="flex justify-end sm:ml-auto"></div>

        <div className="flex flex-row flex-wrap gap-2 sm:gap-3 ">
          {/* Login */}
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-blue-800 font-semibold hover:bg-gray-100 transition cursor-pointer"
          >
            <UserPlus className="w-4 h-4" /> Login
          </button>

          {/* Signup (highlighted) */}
          <button
            onClick={() => navigate("/signup")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition shadow cursor-pointer"
          >
            <UserPlus className="w-4 h-4" /> Signup
          </button>

          {/* Logout */}
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition cursor-pointer">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </nav>
    </>
  );
}

/*
* when i click  line 30 "setShowSidebar" function jo ki HomePage meh hai usko call karaga or uska ander "true" update kr dega or
  fir wo rerender hoga , or ya prev current value hai "false"

*/
