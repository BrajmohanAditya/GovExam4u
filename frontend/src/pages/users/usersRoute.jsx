// pages/Mock/MockRoute.js
import React from "react";
import { Route } from "react-router-dom";
import Signup from "./SignUp";

const usersRoutes = [
  <Route path="/signup" element={<Signup />} key="signup"/>,
];

export default usersRoutes;
