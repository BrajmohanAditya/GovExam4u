import React from "react";
import { Route } from "react-router-dom";
import ExamTrack from "./examTrack.jsx"; //import  function name  from     "./file name"
import ExamEditForm from "./editUpdate";
import ExamAddForm from "./ExamAddForm";
import ProtectedRoute from "../../protectedRoute.jsx";
const examTrackRoute = [

  <Route
    path="/examTracker"
    element={
      // <ProtectedRoute>
        <ExamTrack />
      // </ProtectedRoute>
    }
    key="examTracker"
  />,

  <Route //step: A1 aim: editUpdate form ko render krna
    path="/exam/:id/edit"
    element={<ExamEditForm />}
    key="/exam/:id/edit"
  />,

  <Route path="/add-exam" element={<ExamAddForm />} />,
];

export default examTrackRoute;
