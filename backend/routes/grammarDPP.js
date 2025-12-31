import express from "express";
import  addQuiz  from "../controllers/grammarDPP/addQuize.js";


const router = express.Router();

router.post("/addQuize",  addQuiz);

export default router; 

//auth,adminRoles("editor", "admin"), 