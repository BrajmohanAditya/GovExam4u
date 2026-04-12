import React from "react";
import { Route } from "react-router-dom";

import AdminLayout from "./layout";
import AdminDashboard from "./dashboard";
import ManageQuizzes from "./manage-quizzes";
import AddQuize from "./BankingQuiz/addQuize";
import AddComprehension from "./BankingQuiz/addComprehension";
import ManageSets from "./BankingQuiz/manageSets";

import SchoolAddQuize from "./SchoolQuiz/addQuize";
import SchoolAddComprehension from "./SchoolQuiz/addComprehension";
import SchoolManageSets from "./SchoolQuiz/manageSets";

const adminViewRoute = (
    <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="quizzes" element={<ManageQuizzes />} />
        <Route
            path="bankingQuiz/add-Quize"
            element={<AddQuize />}
            key="bankingQuiz-add-Quize"
        />
        <Route
            path="bankingQuiz/add-comprehension"
            element={<AddComprehension />}
            key="bankingQuiz-add-comprehension"
        />
        <Route
            path="bankingQuiz/manage-sets"
            element={<ManageSets />}
            key="bankingQuiz-manage-sets"
        />
        <Route
            path="schoolQuiz/add-Quize"
            element={<SchoolAddQuize />}
            key="schoolQuiz-add-Quize"
        />
        <Route
            path="schoolQuiz/add-comprehension"
            element={<SchoolAddComprehension />}
            key="schoolQuiz-add-comprehension"
        />
        <Route
            path="schoolQuiz/manage-sets"
            element={<SchoolManageSets />}
            key="schoolQuiz-manage-sets"
        />
    </Route>
)

export default adminViewRoute;
