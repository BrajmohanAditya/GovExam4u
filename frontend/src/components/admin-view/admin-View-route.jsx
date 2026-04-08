import React from "react";
import { Route } from "react-router-dom";

import AdminLayout from "./layout";
import AdminDashboard from "./dashboard";
import ManageQuizzes from "./manage-quizzes";
import AddQuize from "../../pages/BankingQuiz/addQuize";

const adminViewRoute = (
    <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="quizzes" element={<ManageQuizzes />} />
        <Route
            path="allSubjectQuize/add-Quize"
            element={<AddQuize />}
            key="allSubjectQuize-add-Quize"
        />
    </Route>
)

export default adminViewRoute;
