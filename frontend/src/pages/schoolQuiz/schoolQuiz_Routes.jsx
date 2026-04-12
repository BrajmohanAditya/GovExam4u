import React from "react";
import { Route } from "react-router-dom";
import QuizPage from "./Home.jsx";

const schoolQuiz_routes = [
  <Route path="schoolQuiz" element={<QuizPage />} key="schoolQuiz" />,
];

export default schoolQuiz_routes;
