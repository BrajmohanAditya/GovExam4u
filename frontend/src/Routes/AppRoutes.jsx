

import React from "react";
import { Routes, Route } from "react-router-dom";
import Descriptive from "../pages/Descriptive/descriptive";
import HomePage from "../Home/HomePage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/descriptive" element={<Descriptive />} />
      {/* Add more routes here later */}
    </Routes>
  );
}
