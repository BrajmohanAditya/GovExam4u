// AppRoutes.js
import React from "react";
import { Routes } from "react-router-dom";
import DescriptiveRoutes from "./pages/Descriptive/descriptiveRoute";
import HomeRoutes from "./Home/HomeRoute";
import examTrackRoute from "./pages/examTrack/examTrackRoute";
import usersRoutes from "./pages/loginLogout/usersRoute"
import QuizRoute from "./pages/Currentaffair/route";
import LiveMockRouter from "./pages/LiveMock/LiveMockRouter";
import todoListRoute from "./pages/TO-DO-List/todoListRoute";
import grammarDppRoutes from "./pages/english/grammarDPP/grammarDppRoutes";
import allSubjectQuize_routes from "./pages/AllsubjectQuize/AllSubjectQuize_Routes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "./store/auth/auth-slice";

export default function AppRoutes() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);

  // common api call for redox store to fetch user profile data and store in redux store
  useEffect(() => {
    if (!user && !loading) {
      dispatch(fetchUserProfile());
    }
    console.log("hai");
  }, [user, loading, dispatch]);


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
      {allSubjectQuize_routes}
    </Routes>
  );
}
