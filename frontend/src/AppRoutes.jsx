// AppRoutes.js
import React from "react";
import { Routes } from "react-router-dom";
import DescriptiveRoutes from "./pages/Descriptive/descriptiveRoute";
import HomeRoutes from "./Home/HomeRoute";
import examTrackRoute from "./pages/examTrack/examTrackRoute";
import usersRoutes from "./pages/loginLogout/usersRoute"
import QuizRoute from "./pages/Quizes/route";
import LiveMockRouter from "./pages/LiveMock/LiveMockRouter";
import todoListRoute from "./pages/TO-DO-List/todoListRoute";
import grammarDppRoutes from "./pages/english/grammarDPP/grammarDppRoutes";

export default function AppRoutes() {
  return (
    <Routes>
      {HomeRoutes}
      {DescriptiveRoutes}
      {examTrackRoute}
      {usersRoutes}
      {QuizRoute}
      {LiveMockRouter}
      {todoListRoute}
      {grammarDppRoutes}
    </Routes>
  );
}
