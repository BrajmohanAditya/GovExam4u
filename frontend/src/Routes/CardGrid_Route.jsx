// Sara Route CardGrid.jsx ka yaha likho fir isko collectively main.jsx meh dall doh. 

import React from "react";
import { Routes, Route } from "react-router-dom";
import Descriptive from "../pages/Descriptive/descriptive";
import Mocktest  from "../pages/Mock/mock";
export default function CardGrid_Route() {
  return (
    <Routes>
      <Route path="/descriptive" element={<Descriptive />} />
      <Route path="/mock" element={<Mocktest />} />     
    </Routes>
  );
}
