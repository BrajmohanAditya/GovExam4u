import express from "express";
import  addQuize  from "../controllers/grammarDPP/addQuize.js";


const router = express.Router();

router.post("/addQuize",  addQuize);

export default router;

//auth,adminRoles("editor", "admin"),