import mongoose from "mongoose";

const grammarDPPSchema = new mongoose.Schema(
  {
    set: {
      type: String,
      required: true, // "Set 1", "Set 2", etc.
    },
    question: {
      type: String,
      required: true,
      trim: true,
    },

    option1: {
      type: String,
      required: true,
      trim: true,
    },
    option2: {
      type: String,
      required: true,
      trim: true,
    },
    option3: {
      type: String,
      required: true,
      trim: true,
    },
    option4: {
      type: String,
      required: true,
      trim: true,
    },
    option5: {
      type: String,
      trim: true,
    },

    // option1 | option2 | option3 | option4 | option5
    answer: {
      type: String,
      required: true,
      enum: ["option1", "option2", "option3", "option4", "option5"],
    },
    explanation: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const grammarDPPdataBase = mongoose.models.grammarDPPdataBase || mongoose.model("grammarDPPdataBase", grammarDPPSchema);

export default grammarDPPdataBase; // ✅ ES Module export