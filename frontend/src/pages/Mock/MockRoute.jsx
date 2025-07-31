import React from "react";
import { Routes, Route } from "react-router-dom";
import MockTest from "./mock"
export default function MockRoute() {
  return (
    <Routes>
      <Route path="/mock" element={<MockTest />} />
    </Routes>
  );
}
