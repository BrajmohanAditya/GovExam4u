import express from "express";
import  addQuiz  from "../controllers/grammarDPP/addQuize.js";
import  getQuiz  from "../controllers/grammarDPP/getQuiz.js";
import auth from "../middlewares/auth.js";
import adminRoles from "../middlewares/adminRole.js";
import  submitTest  from "../controllers/grammarDPP/attemptedTest.js";
const router = express.Router();
//auth, adminRoles("editor", "admin"),
router.post("/addQuize",auth, adminRoles("editor", "admin"),  addQuiz);
router.get("/getQuiz",  getQuiz);
router.post("/submitTest",auth, submitTest)

export default router; 

//auth,adminRoles("editor", "admin"), 