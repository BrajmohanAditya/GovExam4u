
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import HomeRoute from "./Home/HomeRoute";
import DescriptiveRoute from "./pages/Descriptive/descriptiveRoute";
import MockRoute from "./pages/Mock/MockRoute";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <HomeRoute />
    <DescriptiveRoute />
    <MockRoute/>
  </BrowserRouter>
);



