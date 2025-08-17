
import React from "react";
import { Route } from "react-router-dom";
import ExamTrack from "./examTrack";
import ExamEditForm from "./editUpdate"
const examTrackRoute = [
  <Route path="/examTracker" element={<ExamTrack />} key="examTracker" />,
  <Route path="/exam/:id/edit" element={<ExamEditForm />} key="/exam/:id/edit" />

];

export default examTrackRoute;

