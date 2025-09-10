// Backend File. 
const express = require("express");
const router = express.Router();
const examTrack = require("../models/examTrack.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {joiexamdateSchema} = require("../joiSchema.js")   // step:4
const ExpressError = require("../utils/ExpressError");

//step- 4 , aim: restricting wrong data from hopscotch , work: creating middlemalwere. 
const validateExamDate = (req, res, next) => {
  let { error } = joiexamdateSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
}; 
//--- 

//step: A0, aim: Display card, work: db seh All exams ka data nikal k frontend(examTrack) ko send kr raha . 
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const Allexam = await examTrack.find({});
    res.json(Allexam); // Allexam - ya just above wala line seh aya hai
  })
);
//

//step: A2, aim: edit editUpdate form, work: frontend k editUpdate page k ander ak route ko data send kr raha hai
router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const exam = await examTrack.findById(id); // apna model ka naam Exam rakho
    res.json(exam); // frontend React ko JSON bhejna
  })
);
//--

//step: A2, aim: save data of, editUpdate form,  work : fronttend(editUpdate.jsx) seh aya hua data ko receive kr k save krta hai.
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
    res.json({ message: "Exam updated successfully!", exam: updatedExam });
  })
);
//--

//delet route (editUpdate.jsx meh ya route ka connection hai)
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

//step: A3, aim: Adding new card, work: Frontend(ExamAddForm.jsx) seh aya hua data ko receive kr ka save krna
router.post(
  "/",
  validateExamDate, // step- 4 , aim: restricting wrong data from hopscotch , work: middlemalwere implemented to restrict data.
  wrapAsync(async (req, res) => {
    const count = await examTrack.countDocuments();
    if (count >= 9) {
      return res.status(400).json({ message: "You Can't Add more than 9 Exams" });
    }
    // agar 9 se kam hai toh naya add karo
    const newExam = new examTrack(req.body);
    await newExam.save();
    res.status(201).json({message: "Exam added successfully!", data: newExam});
  })
);
//---
module.exports = router;


/*
1. wrapAsync
Ye ek error handling utility hai.
Sirf async routes ke errors ko automatically catch karta hai.
Iska kaam hai:
try–catch bar-bar likhne se bachana.
Agar koi error aaya toh next(err) karke Express ke global error handler tak bhejna.
server crash seh bachata hai. 

2. Joi Validation
Ye ek data validation library hai.
Iska kaam hai: frontend se aane wale data ko check karna ki wo required format me hai ya nahi.
*/