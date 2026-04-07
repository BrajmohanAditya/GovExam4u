import React from "react";
import { Route } from "react-router-dom";

import AdminLayout from "./layout";
import AdminDashboard from "./dashboard";
import ManageQuizzes from "./manage-quizzes";

const adminViewRoute = (
    <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="quizzes" element={<ManageQuizzes />} />
    </Route>
)

export default adminViewRoute;
