import express from "express";
import addQuizeController from "../controllers/BankingQuiz/addQuize.js";
import getQuiz from "../controllers/BankingQuiz/getQuiz.js";
import isLoggedIn from "../middlewares/isloggedIn.js";
import adminRoles from "../middlewares/adminRole.js";
import submitTest from "../controllers/BankingQuiz/attemptedTest.js";
import verifyAttempt from "../controllers/BankingQuiz/verifyAttempt.js";
import leaderboard from "../controllers/BankingQuiz/leaderboard.js";
import { getAllLockStatus } from "../controllers/BankingQuiz/getAllLockStatus.js";

import { 
  getLockStatus,
  toggleLock,
} from "../controllers/BankingQuiz/setLockController.js";
import {
  getLiveStatus,
  toggleLive,
} from "../controllers/BankingQuiz/setLiveController.js";
import { getAllLiveStatus } from "../controllers/BankingQuiz/getAllLiveStatus.js";

import { getSetTime, updateSetTime } from "../controllers/BankingQuiz/setTimeController.js";
import { getAllSetTimes } from "../controllers/BankingQuiz/getAllSetTime.js";

import { getWinner, declareWinner } from "../controllers/BankingQuiz/winnerController.js";
import { getAllWinners } from "../controllers/BankingQuiz/getAllWinners.js";
import { deleteSet } from "../controllers/BankingQuiz/deleteSetController.js";

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
