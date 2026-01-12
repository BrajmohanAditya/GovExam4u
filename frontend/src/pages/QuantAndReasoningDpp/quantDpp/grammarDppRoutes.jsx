import React from "react";
import { Route } from "react-router-dom";
import QuizPage from "./Home.jsx";
import AddQuize from "./addQuize.jsx";

const grammarDppRoutes = [
  <Route path="grammarDPP" element={<QuizPage/>} key="grammarDPP" />,
  <Route path="add-Quize" element={<AddQuize/>} key="add-Quize" />
];

  
export default grammarDppRoutes;
