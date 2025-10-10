import React from "react";
import { Route } from "react-router-dom";
import Login from "./login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import OtpVerify from "./OtpVerify";
import UpdatePassword from "./UpdatePassword";
const usersRoutes = [
  <Route path="/login" element={<Login />} key="login" />,
  <Route path="/register" element={<Register />} key="notfound" />,
  <Route path="/password/forgot" element={<ForgotPassword />} />,
  <Route path="/otpVerify" element={<OtpVerify />} />,
  <Route path="/passwordReset" element={<UpdatePassword />} />,
];

export default usersRoutes;
