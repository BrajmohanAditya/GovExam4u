import React from "react";
import { Route } from "react-router-dom";
import QuizPage from "./Home.jsx";
const bankingQuiz_routes = [
  <Route path="bankingQuiz" element={<QuizPage />} key="bankingQuiz" />,
];

export default bankingQuiz_routes;
