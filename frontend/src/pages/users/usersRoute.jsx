// pages/Mock/MockRoute.js
import React from "react";
import { Route } from "react-router-dom";
import Signup from "./SignUp";
import Login from "./Login";

const usersRoutes = [
  <Route path="/signup" element={<Signup />} key="signup" />,
  <Route path="/login" element={<Login />} key="login" />,
];

export default usersRoutes;
