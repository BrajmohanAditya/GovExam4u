// AppRoutes.js
import React from "react";
import { Routes } from "react-router-dom";
import DescriptiveRoutes from "./pages/Descriptive/descriptiveRoute";
import HomeRoutes from "./Home/HomeRoute";
import MockRoutes from "./pages/Mock/MockRoute";
import examTrackRoute from "./pages/examTrack/examTrackRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {HomeRoutes}
      {DescriptiveRoutes}
      {MockRoutes}
      {examTrackRoute}
    </Routes>
  );
}
