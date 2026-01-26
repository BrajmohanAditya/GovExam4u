import express from "express";
import addQuizeController from "../controllers/allSubQuiz/addQuize.js";
import getQuiz from "../controllers/allSubQuiz/getQuiz.js";
import isLoggedIn from "../middlewares/isloggedIn.js";
import adminRoles from "../middlewares/adminRole.js";
import submitTest from "../controllers/allSubQuiz/attemptedTest.js";
import verifyAttempt from "../controllers/allSubQuiz/verifyAttempt.js";
import leaderboard from "../controllers/allSubQuiz/leaderboard.js";
import { getAllLockStatus } from "../controllers/allSubQuiz/getAllLockStatus.js";

import {
  getLockStatus,
  toggleLock,
} from "../controllers/allSubQuiz/setLockController.js";

const router = express.Router();
router.post(
  "/addQuize",
  isLoggedIn,
  adminRoles("editor", "admin"),
  addQuizeController,
);
router.get("/getQuiz", getQuiz);
router.post("/submitTest", isLoggedIn, submitTest);
router.post("/verifyAttempt", isLoggedIn, verifyAttempt);
router.post("/leaderboard", isLoggedIn, leaderboard);
router.get("/is-locked/:set", getLockStatus);

router.put(
  "/toggle-lock/:set",
  isLoggedIn,
  adminRoles("editor", "admin"),
  toggleLock
);

router.get("/lock-status", getAllLockStatus);

export default router;


//adminRoles("editor", "admin"),