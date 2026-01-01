import express from "express";
import  addQuiz  from "../controllers/grammarDPP/addQuize.js";
import  getQuiz  from "../controllers/grammarDPP/getQuiz.js";

const router = express.Router();

router.post("/addQuize",  addQuiz);
router.get("/getQuiz",  getQuiz);

export default router; 

//auth,adminRoles("editor", "admin"), 