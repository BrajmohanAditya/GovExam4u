import mongoose from "mongoose";

const SetWinnerSchema = new mongoose.Schema(
  {
    set: {
      type: String,
      required: true,
      unique: true, 
    },
    winnerName: {
      type: String,
      required: true,
    },
    winnerScore: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SetWinner = mongoose.model("bankingQuiz/SetWinner", SetWinnerSchema);
export default SetWinner;
