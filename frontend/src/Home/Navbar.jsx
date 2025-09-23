
/*
* when i click  line 30 "setShowSidebar" function jo ki HomePage meh hai usko call karaga or uska ander "true" update kr dega or
  fir wo rerender hoga , or ya prev current value hai "false"

*/
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { GraduationCap, LogIn, UserPlus, LogOut } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import api from "../api"; // Axios instance

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

  // JWT check on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await api.get("/current-user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
        localStorage.removeItem("token"); // remove invalid token
      }
    };

    fetchUser();
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/", { replace: true });
  };

  return (
    <nav className="w-full bg-blue-800 sticky top-0 z-[1000] px-4 py-3 flex flex-wrap items-center justify-between gap-3">
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
      <form className="flex flex-1 sm:flex-none flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 max-w-full sm:max-w-2xl w-full">
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

      {/* Right: User actions */}
      <div className="flex flex-row flex-wrap gap-2 sm:gap-3 justify-end">
        {user ? (
          // Logged in: show logout
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-red-500 text-white text-sm sm:text-base font-semibold hover:bg-red-600 transition shadow cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        ) : (
          // Logged out: show login/signup
          <>
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-white text-blue-800 text-sm sm:text-base font-semibold hover:bg-gray-100 transition cursor-pointer"
            >
              <LogIn className="w-4 h-4" /> Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-green-600 text-white text-sm sm:text-base font-semibold hover:bg-green-700 transition shadow cursor-pointer"
            >
              <UserPlus className="w-4 h-4" /> Signup
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
