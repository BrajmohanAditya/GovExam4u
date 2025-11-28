import express from 'express';
import addCard from '../controllers/liveMock/addCard.js';
const router = express.Router();


router.post("/addCard", addCard); 


export default router;