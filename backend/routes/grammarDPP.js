import express from "express";
import  addQuiz  from "../controllers/grammarDPP/addQuize.js";
import  getQuiz  from "../controllers/grammarDPP/getQuiz.js";
import auth from "../middlewares/auth.js";
import adminRoles from "../middlewares/adminRole.js";
const router = express.Router();

router.post("/addQuize", auth, adminRoles("editor", "admin"), addQuiz);
router.get("/getQuiz",  getQuiz);

export default router; 

//auth,adminRoles("editor", "admin"), 