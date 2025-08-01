
import React from "react";
import HomePage from "./HomePage"; // Your Home component
import { Route } from "react-router-dom";

const HomeRoutes = [
  <Route path="/" element={<HomePage />} key="home" />
];

export default HomeRoutes;
