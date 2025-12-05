import React from "react";
import Descriptive from "./Home";
import QuestionPage from "./QuestionPage";
import { Route } from "react-router-dom";
import ProtectedRoute from "../../protectedRoute";

const DescriptiveRoutes = [
  <Route
    path="/descriptive"
    element={
      <ProtectedRoute>
        <Descriptive />
      </ProtectedRoute>
    }
    key="desc"
  />,

  <Route path="/questions/:type" element={<QuestionPage />} key="ques" />,
];

export default DescriptiveRoutes;
