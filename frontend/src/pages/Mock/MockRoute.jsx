
// pages/Mock/MockRoute.js
import React from "react";
import { Route } from "react-router-dom";
import MockTest from "./Home";

const MockRoutes = [
  <Route path="/mock" element={<MockTest/>} key="mock" />
];

export default MockRoutes;
