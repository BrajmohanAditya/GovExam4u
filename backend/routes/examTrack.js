const express = require("express");
const router = express.Router();
const examTrack = require("../models/examTrack.js");
//examTrack aapka Mongoose model hai jo MongoDB ke examdates collection ko represent karta hai.
// router.get("/", async (req, res) => {
//   const Allexam = await examTrack.find({}); 
//   res.render("examTrack/index.ejs", { Allexam });
// });

router.get("/", async (req, res) => {
  const Allexam = await examTrack.find({}); 
  res.json(Allexam );
});

module.exports = router;
