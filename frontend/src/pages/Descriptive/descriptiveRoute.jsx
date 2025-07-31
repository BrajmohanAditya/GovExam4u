import React from "react";
import { Routes, Route } from "react-router-dom";
import Descriptive from "./descriptive";
import QuestionPage from "./QuestionPage";
export default function DescriptiveRoute() {
  return (
    <Routes>
      <Route path="/descriptive" element={<Descriptive />} />
      <Route path="/questions/:type" element={<QuestionPage />} /> 
    </Routes>
  );
}