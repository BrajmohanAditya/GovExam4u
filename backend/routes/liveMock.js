import express from 'express';
import addCard from '../controllers/liveMock/addCard.js';
import getCards from '../controllers/liveMock/getCard.js';
const router = express.Router();


router.post("/addCard", addCard); 
router.get("/getCards", getCards);


export default router;