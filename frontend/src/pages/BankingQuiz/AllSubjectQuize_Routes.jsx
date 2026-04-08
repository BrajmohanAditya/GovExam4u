import React from "react";
import { Route } from "react-router-dom";
import QuizPage from "./Home.jsx";
const allSubjectQuize_routes = [
  <Route path="allSubjectQuize" element={<QuizPage />} key="allSubjectQuize" />,
];

export default allSubjectQuize_routes;
