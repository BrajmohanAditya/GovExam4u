import express from "express";
import addQuiz from "../controllers/grammarDPP/addQuize.js";
import getQuiz from "../controllers/grammarDPP/getQuiz.js";
import isLoggedIn from "../middlewares/isloggedIn.js";
import adminRoles from "../middlewares/adminRole.js";
import submitTest from "../controllers/grammarDPP/attemptedTest.js";
import verifyAttempt from "../controllers/grammarDPP/verifyAttempt.js";
import leaderboard from "../controllers/grammarDPP/leaderboard.js";
import  {getAllLockStatus}  from "../controllers/grammarDPP/getAllLockStatus.js";

import {
  getLockStatus,
  toggleLock,
} from "../controllers/grammarDPP/setLockController.js";

const router = express.Router();
router.post("/addQuize", isLoggedIn, adminRoles("editor", "admin"), addQuiz);
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


