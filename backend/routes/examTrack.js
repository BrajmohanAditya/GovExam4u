const express = require("express");
const router = express.Router();
const examTrack = require("../models/examTrack.js");
const wrapAsync = require("../utils/wrapAsync.js");

// work: db seh data nikal k frontend ko send kr raha (sending all exam)
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const Allexam = await examTrack.find({});
    res.json(Allexam); // Allexam - ya just above wala line seh aya hai
  })
);
//

//  edit route, frontend k editUpdate page k ander ak route ko data send kr raha hai
router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const exam = await examTrack.findById(id); // apna model ka naam Exam rakho
    res.json(exam); // frontend React ko JSON bhejna
  })
);
//--

//fronttend seh aya hua data ko receive kr k save krta hai
router.put(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const updatedExam = await examTrack.findByIdAndUpdate(id, req.body, {
      new: true, // updated document return kare
    });
    if (!updatedExam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    res.json(updatedExam);
  })
);
//--

//delet route
router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const deletedExam = await examTrack.findByIdAndDelete(id);
    if (!deletedExam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    res.json({ message: "Exam deleted successfully" });
  })
);
//--

// aim: Adding new card.
router.post(
  "/",
  wrapAsync(async (req, res) => {
    const count = await examTrack.countDocuments();
    if (count >= 9) {
      return res.status(400).json({ message: "Maximum 9 exams allowed" });
    }
    // agar 9 se kam hai toh naya add karo
    const newExam = new examTrack(req.body);
    await newExam.save();
    res.status(201).json(newExam);
  })
);

module.exports = router;
