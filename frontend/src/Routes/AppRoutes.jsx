// src/routes/AppRoutes.jsx

// 

import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "../Home/HomePage";
import Descriptive from "../pages/descriptive";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/descriptive" element={<Descriptive />} />
      {/* Add more routes here later */}
    </Routes>
  );
}
