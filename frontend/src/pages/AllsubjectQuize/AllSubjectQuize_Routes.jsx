import React from "react";
import { Route } from "react-router-dom";
import QuizPage from "./Home.jsx";
import AddQuize from "./addQuize.jsx";
const allSubjectQuize_routes = [
  <Route path="allSubjectQuize" element={<QuizPage />} key="allSubjectQuize" />,
  <Route
    path="allSubjectQuize/add-Quize"
    element={<AddQuize />}
    key="allSubjectQuize-add-Quize"
  />,
];

export default allSubjectQuize_routes;
