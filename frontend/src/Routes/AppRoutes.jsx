// src/routes/AppRoutes.jsx

// 

import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "../components/HomePage";
import Descriptive from "../pages/Descriptive";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/descriptive" element={<Descriptive />} />
      {/* Add more routes here later */}
    </Routes>
  );
}
