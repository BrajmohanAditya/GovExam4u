import React from "react";
import { Route } from "react-router-dom";
import QuizPage from "./Home.jsx";
import AddQuize from "./addQuize.jsx";
const allSubjectQuize_routes = [
  <Route path="AllSub_QuizePage" element={<QuizPage/>} key="grammarDPP" />,
  <Route path="add-Quize" element={<AddQuize/>} key="add-Quize" />,
];

  
export default allSubjectQuize_routes;