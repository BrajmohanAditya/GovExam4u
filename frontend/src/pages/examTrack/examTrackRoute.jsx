
import React from "react";
import { Route } from "react-router-dom";
import ExamTrack from "./examTrack";

const examTrackRoute = [
  <Route path="/examTracker" element={<ExamTrack />} key="examTracker" />
];

export default examTrackRoute;

