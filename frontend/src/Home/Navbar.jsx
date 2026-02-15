/*
* when i click  line 30 "setShowSidebar" function jo ki HomePage meh hai usko call karaga or uska ander "true" update kr dega or
  fir wo rerender hoga , or ya prev current value hai "false"

*/
import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { GraduationCap, LogIn, UserPlus, LogOut } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import apis from "../pages/loginLogout/utils/apisUsers.js";
import httpAction from "../pages/loginLogout/utils/httpAction";
import { navbarStyles } from "./style";

function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <GraduationCap className="h-8 w-8 sm:h-9 sm:w-9 text-white" />
      <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold font-sans tracking-wide">
        <span className="text-white">Gov</span>
        <span className="text-orange-500">Exam4u</span>
      </h1>
    </div>
  );
}

export default function Navbar({ showSidebar, setShowSidebar }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Verify user on component mount
  useEffect(() => {
    const getUser = async () => {
      const data = { url: apis().verifyUser };
      const result = await httpAction(data);

      if (result?.loggedIn || result?.status) {
        setUser(result.user);
      } else {
        setUser(null);
      }
    };

    getUser();
  }, []);

  // Logout
  const handleLogout = async () => {
    const data = {
      url: apis().logoutUser,
    };
    const result = await httpAction(data);
    if (result?.status) {
      setUser(null);
      navigate("/");
    }
  };

  //  navbar height claculation
  useEffect(() => {
    const nav = document.getElementById("navbar");
    if (nav) {
      document.documentElement.style.setProperty(
        "--navbar-height",
        nav.getBoundingClientRect().height + "px"
      );
    }
  }, []);

  return (
    <nav id="navbar" className={navbarStyles.nav}>
      {/* Left: Logo + Hamburger */}
      <div className="flex items-center gap-2">
        <button
          className="sm:hidden p-2 text-white"
          onClick={() => setShowSidebar((prev) => !prev)}
        >
          <FontAwesomeIcon
            icon={showSidebar ? faTimes : faBars}
            className="text-xl"
          />
        </button>
        <Logo />
      </div>

      {/* Search */}
      <form className="flex flex-1 sm:flex-none fex-row items-center gap-2 max-w-full sm:max-w-2xl w-full">
        <input
          type="search"
          placeholder="Search"
          className="border border-gray-300 rounded-lg flex-1 h-10 px-3 bg-white text-sm sm:text-base"
        />
        <Button
          size="large"
          style={{ backgroundColor: "#ff5722", color: "white" }}
          startIcon={<SearchIcon />}
        >
          Search
        </Button>
      </form>

      <div className="flex flex-row flex-wrap gap-2 sm:gap-3 justify-end items-center">
        {user ? (
          // Logged in: show username + logout
          <>
            <span className="text-white font-semibold text-sm sm:text-base">
              {user?.name?.split(" ")[0]}
            </span>
            <button onClick={handleLogout} className="cursor-pointer">
              <LogOut className="w-4 h-4 " />
            </button>
          </>
        ) : (
          // Logged out: show login/signup
          <>
            <button
              onClick={() => navigate("/login")}
              className={navbarStyles.login}
            >
              <LogIn className="w-4 h-4" /> Login
            </button>


          </>
        )}
      </div>
    </nav>
  );
}
