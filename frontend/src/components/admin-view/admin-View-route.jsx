import React from "react";
import { Route } from "react-router-dom";

import AdminLayout from "./layout";

const adminViewRoute = (
    <Route path="/admin" element={<AdminLayout />} />
)

export default adminViewRoute;
