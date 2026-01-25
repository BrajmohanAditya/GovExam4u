// pages/Mock/MockRoute.js
import React from "react";
import { Route } from "react-router-dom";
import CAQuiz from "./Home.jsx";

const QuizRoute = [
  <Route path="/ca-quiz" element={<CAQuiz />} key="ca-quiz" />,
];

export default QuizRoute;
