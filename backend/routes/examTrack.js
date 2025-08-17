const express = require("express");
const router = express.Router();
const examTrack = require("../models/examTrack.js");

// work: db seh data nikal k frontend ko send kr raha 
router.get("/", async (req, res) => {
  const Allexam = await examTrack.find({});
  res.json(Allexam); // Allexam - ya just above wala line seh aya hai
});
//


//edit and update route 
router.get("/:id/edit", async (req, res) => {
  let { id } = req.params;
  const exam = await examTrack.findById(id); // apna model ka naam Exam rakho
  res.json(exam); // frontend React ko JSON bhejna
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedExam = await examTrack.findByIdAndUpdate(id, req.body, {
    new: true, // updated document return kare
  });
  if (!updatedExam) {
    return res.status(404).json({ message: "Exam not found" });
  }
  res.json(updatedExam);
});
//---


module.exports = router;
