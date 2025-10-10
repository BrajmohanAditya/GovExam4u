import React from "react";
import { Route } from "react-router-dom";
import computerQuize from "./QuizeMainPage";

const routes = [<Route path="/mock" element={<computerQuize />} key="computer" />];

export default routes;
