
// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "./index.css";

// import AppRoutes from "./AppRoutes";
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <BrowserRouter>
//     <AppRoutes />
//   </BrowserRouter>
// );
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
import "./index.css";

import AppRoutes from "./AppRoutes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router>
      <AppRoutes />
    </Router>
);



