import React from "react";
import { Route } from "react-router-dom";
import QuizPage from "./Home.jsx";
import ClassLandingPage from "./ClassLandingPage.jsx";

const schoolQuiz_routes = [
  <Route path="schoolQuiz" element={<ClassLandingPage />} key="schoolQuiz" />,
  <Route path="schoolQuiz/:classId" element={<QuizPage />} key="schoolQuizClass" />,
];

export default schoolQuiz_routes;
