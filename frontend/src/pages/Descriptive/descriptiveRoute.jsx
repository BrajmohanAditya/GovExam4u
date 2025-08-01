import React from "react";
import Descriptive from "./descriptive";
import QuestionPage from "./QuestionPage";
import { Route } from "react-router-dom";

const DescriptiveRoutes = [
  <Route path="/descriptive" element={<Descriptive />} key="desc" />,
  <Route path="/questions/:type" element={<QuestionPage />} key="ques" />
];

export default DescriptiveRoutes;
