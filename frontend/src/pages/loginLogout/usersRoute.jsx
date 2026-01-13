import React from "react";
import { Route } from "react-router-dom";
import Login from "./login.jsx";
import Register from "./Register.jsx";
import ForgotPassword from "./ForgotPassword.jsx";
import OtpVerify from "./OtpVerify.jsx";
import UpdatePassword from "./UpdatePassword.jsx";
import Super from "./super.jsx";
import HomePage from "../../Home/HomePage.jsx";
const usersRoutes = [
  <Route path="/login" element={<Login />} key="login" />,
  <Route path="/register" element={<Register />} key="notfound" />,
  <Route path="/password/forgot" element={<ForgotPassword />} />,
  <Route path="/otpVerify" element={<OtpVerify />} />,
  <Route path="/passwordReset" element={<UpdatePassword />} />,
  <Route element={<Super />}>
    <Route path="/" element={<HomePage />} />,
  </Route>,
];

export default usersRoutes;
