
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import {store} from "./store/store.js";

import AppRoutes from "./AppRoutes";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <Router>
      <AppRoutes />
      <Toaster />
    </Router>
  </Provider>,
);