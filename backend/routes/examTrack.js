const express = require("express");
const router = express.Router();
const examTrack = require("../models/examTrack.js");

// work: db seh data nikal k frontend ko send kr raha (sending all exam)
router.get("/", async (req, res) => {
  const Allexam = await examTrack.find({});
  res.json(Allexam); // Allexam - ya just above wala line seh aya hai
});
//


//  edit route, frontend k editUpdate page k ander ak route ko data send kr raha hai 
router.get("/:id/edit", async (req, res) => {
  let { id } = req.params;
  const exam = await examTrack.findById(id); // apna model ka naam Exam rakho
  res.json(exam); // frontend React ko JSON bhejna
});
//--

//fronttend seh aya hua data ko receive kr k save krta hai 
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
//--


//delet route
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExam = await examTrack.findByIdAndDelete(id);

    if (!deletedExam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    res.json({ message: "Exam deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong while deleting" });
  }
});
//--


// POST route - naya exam add karne ke liye
// router.post("/", async (req, res) => {
//   try {
//     const newExam = new examTrack(req.body);  // frontend se data aayega
//     await newExam.save();                     // DB me save karo
//     res.status(201).json(newExam);            // response bhejo
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to add exam" });
//   }
// });

// naya exam card add karne ka route
router.post("/", async (req, res) => {
  try {
    // pehle count check karo
    const count = await examTrack.countDocuments();
    if (count >= 9) {
      return res.status(400).json({ message: "Maximum 9 exams allowed" });
    }

    // agar 9 se kam hai toh naya add karo
    const newExam = new examTrack(req.body);
    await newExam.save();

    res.status(201).json(newExam);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong while adding exam" });
  }
});

module.exports = router;
