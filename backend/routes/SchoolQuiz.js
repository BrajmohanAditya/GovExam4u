import express from "express";
import addQuizeController from "../controllers/SchoolQuiz/addQuize.js";
import getQuiz from "../controllers/SchoolQuiz/getQuiz.js";
import isLoggedIn from "../middlewares/isloggedIn.js";
import adminRoles from "../middlewares/adminRole.js";
import submitTest from "../controllers/SchoolQuiz/attemptedTest.js";
import verifyAttempt from "../controllers/SchoolQuiz/verifyAttempt.js";
import leaderboard from "../controllers/SchoolQuiz/leaderboard.js";
import { getAllLockStatus } from "../controllers/SchoolQuiz/getAllLockStatus.js";

import { 
  getLockStatus,
  toggleLock,
} from "../controllers/SchoolQuiz/setLockController.js";
import {
  getLiveStatus,
  toggleLive,
} from "../controllers/SchoolQuiz/setLiveController.js";
import { getAllLiveStatus } from "../controllers/SchoolQuiz/getAllLiveStatus.js";

import { getSetTime, updateSetTime } from "../controllers/SchoolQuiz/setTimeController.js";
import { getAllSetTimes } from "../controllers/SchoolQuiz/getAllSetTime.js";

import { getWinner, declareWinner } from "../controllers/SchoolQuiz/winnerController.js";
import { getAllWinners } from "../controllers/SchoolQuiz/getAllWinners.js";
import { deleteSet } from "../controllers/SchoolQuiz/deleteSetController.js";

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
router.get("/is-live/:set", getLiveStatus);

router.put(
  "/toggle-lock/:set",
  isLoggedIn,
  adminRoles("editor", "admin"),
  toggleLock,
);

router.put(
  "/toggle-live/:set",
  isLoggedIn,
  adminRoles("editor", "admin"),
  toggleLive,
);

router.get("/lock-status", getAllLockStatus);
router.get("/live-status", getAllLiveStatus);
router.get("/time-status", getAllSetTimes);

router.get("/get-time/:set", getSetTime);
router.put(
  "/update-time/:set",
  isLoggedIn,
  adminRoles("editor", "admin"),
  updateSetTime
);

router.post(
  "/declare-winner/:setName",
  isLoggedIn,
  adminRoles("editor", "admin"),
  declareWinner,
);

router.get("/get-winner/:setName", getWinner);
router.get("/all-winners", getAllWinners);

router.delete(
  "/delete-set/:setName",
  isLoggedIn,
  adminRoles("editor", "admin"),
  deleteSet,
);

export default router;

//adminRoles("editor", "admin"),
