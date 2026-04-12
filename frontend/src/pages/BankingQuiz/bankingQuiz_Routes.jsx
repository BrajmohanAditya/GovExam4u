import React from "react";
import { Route } from "react-router-dom";
import BankingQuiz from "./Home.jsx";
const bankingQuiz_routes = [
  <Route path="bankingQuiz" element={<BankingQuiz />} key="bankingQuiz" />,
];

export default bankingQuiz_routes;
