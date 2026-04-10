// AppRoutes.js
import React from "react";
import { Routes } from "react-router-dom";
import DescriptiveRoutes from "./pages/Descriptive/descriptiveRoute";
import HomeRoutes from "./Home/HomeRoute";
import examTrackRoute from "./pages/examTrack/examTrackRoute";
import loginLogoutRoutes from "./pages/loginLogout/usersRoute"

import LiveMockRouter from "./pages/LiveMock/LiveMockRouter";
import todoListRoute from "./pages/TO-DO-List/todoListRoute";
import bankingQuiz_routes from "./pages/BankingQuiz/bankingQuiz_Routes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, checkAuth } from "./store/auth/auth-slice";
import CheckAuth from "./components/common/check-auth";
import adminViewRoute from "./components/admin-view/admin-View-route";


export default function AppRoutes() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);

  // common api call for redox store to fetch user profile data and store in redux store
  useEffect(() => {
    if (!user) {
      dispatch(fetchUserProfile());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);


  const { user: authUser, isAuthenticated, isLoading } = useSelector(
    (state) => state.user,
  );
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <CheckAuth isAuthenticated={isAuthenticated} user={user}>

      <Routes>
        {HomeRoutes}
        {DescriptiveRoutes}
        {examTrackRoute}
        {loginLogoutRoutes}

        {LiveMockRouter}
        {todoListRoute}
        {/* {grammarDppRoutes} */}
        {bankingQuiz_routes}
        {adminViewRoute}
      </Routes>
    </CheckAuth>
  );
}
