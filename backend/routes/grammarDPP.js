import express from "express";
import addQuiz from "../controllers/grammarDPP/addQuize.js";
import getQuiz from "../controllers/grammarDPP/getQuiz.js";
import auth from "../middlewares/auth.js";
import adminRoles from "../middlewares/adminRole.js";
import submitTest from "../controllers/grammarDPP/attemptedTest.js";
import verifyAttempt from "../controllers/grammarDPP/verifyAttempt.js";
import leaderboard from "../controllers/grammarDPP/leaderboard.js";

const router = express.Router();
router.post("/addQuize", auth, adminRoles("editor", "admin"), addQuiz);
router.get("/getQuiz", getQuiz);
router.post("/submitTest", auth, submitTest);
router.post("/verifyAttempt", auth, verifyAttempt);
router.post("/leaderboard", auth, leaderboard);

export default router;

//auth,adminRoles("editor", "admin"),
