const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const examdateSchema = new Schema({
  Exam: {
    type: String,
    required: true,
  },
  Pre: {
    type: Date,
    required: true,
  },
  Mains: {
    type: Date,
    required: true,
  },
});



const examdate = mongoose.model("examdate", examdateSchema); // ("collection ka naam ", collection ka schema)
module.exports = examdate;
