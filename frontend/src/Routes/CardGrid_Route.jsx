// All routes of card 

import React from "react";
import { Routes, Route } from "react-router-dom";
import Descriptive from "../pages/Descriptive/descriptive";

export default function CardGrid_Route() {
  return (
    <Routes>
      <Route path="/descriptive" element={<Descriptive />} />
    </Routes>
  );
}
