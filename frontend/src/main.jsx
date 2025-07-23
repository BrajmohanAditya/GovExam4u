
// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "./index.css";
// import App from "./App.jsx";

// createRoot(document.getElementById("root")).render(
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import HomePage from "./Home/HomePage";
import Descriptive from "./pages/Descriptive/descriptive";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/descriptive" element={<Descriptive />} />
    </Routes>
  </BrowserRouter>
);