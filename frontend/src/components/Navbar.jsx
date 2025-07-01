
import React from "react";
// import avatar from "../assets/images/tb-avatar.svg";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

export default function Navbar() {
  return (
    <nav className="w-full bg-gray-500 sticky top-0 z-[1000] px-4 py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <h1 className="relative left-3 font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#ec5a47] font-serif tracking-wide pr-4">
        GovExam4u
      </h1>

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

      <div className="flex justify-end sm:ml-auto">
        {/* <img src={avatar} alt="User Avatar" className="w-8 h-8 rounded-full" /> */}
      </div>
    </nav>
  );
}
