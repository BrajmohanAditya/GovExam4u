import React from "react";
import { Route } from "react-router-dom";
import bankingQuiz from "./Home.jsx";
const bankingQuiz_routes = [
  <Route path="bankingQuiz" element={<bankingQuiz />} key="bankingQuiz" />,
];

export default bankingQuiz_routes;
