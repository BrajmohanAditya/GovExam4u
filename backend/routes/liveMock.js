import express from 'express';
import addCard from '../controllers/liveMock/addCard.js';
import getCards from '../controllers/liveMock/getCard.js';
import bringCard from '../controllers/liveMock/bringCard.js';
import updateCard from '../controllers/liveMock/updateCard.js';
import deleteCard from '../controllers/liveMock/deletCard.js';

const router = express.Router();


router.post("/addCard", addCard); 
router.get("/getCards", getCards);
router.get("/:id/bringCard", bringCard); // bringing single card by id
router.put("/:id/updateCard", updateCard); // updating card by id
router.delete("/:id/deleteCard", deleteCard); // deleting card by id


export default router;