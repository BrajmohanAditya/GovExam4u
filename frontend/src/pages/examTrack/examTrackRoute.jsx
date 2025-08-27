
import React from "react";
import { Route } from "react-router-dom";
import ExamTrack from "./examTrack";
import ExamEditForm from "./editUpdate"
import ExamAddForm from "./ExamAddForm";
const examTrackRoute = [
  <Route path="/examTracker" element={<ExamTrack />} key="examTracker" />,
  <Route path="/exam/:id/edit" element={<ExamEditForm />} key="/exam/:id/edit" />,
  <Route path="/add-exam" element={<ExamAddForm />} />   
];

export default examTrackRoute;

