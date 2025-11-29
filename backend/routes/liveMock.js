import express from "express";
import addCard from "../controllers/liveMock/addCard.js";
import getCards from "../controllers/liveMock/getCard.js";
import bringCard from "../controllers/liveMock/bringCard.js";
import updateCard from "../controllers/liveMock/updateCard.js";
import deleteCard from "../controllers/liveMock/deletCard.js";
import auth from "../middlewares/auth.js";
import adminRoles from "../middlewares/adminRole.js";

const router = express.Router();

router.post("/addCard", auth, adminRoles("editor", "admin"), addCard);
router.get("/getCards", getCards);
router.get("/:id/bringCard", auth, adminRoles("editor", "admin"), bringCard); // bringing single card by id
router.put("/:id/updateCard", auth, adminRoles("editor", "admin"), updateCard); // updating card by id
router.delete( "/:id/deleteCard",auth,adminRoles("editor", "admin"), deleteCard); // deleting card by id

export default router;

//auth,adminRoles("editor", "admin"),
