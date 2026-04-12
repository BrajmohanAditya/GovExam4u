import mongoose from "mongoose";

const addQuizSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
      trim: true,
      default: "General",
    },
    // e.g. "English - Set 1", "Reasoning - Set 2"
    set: {
      type: String,
      required: true,
      trim: true,
    },

    passage: {
      type: String,
      trim: true,
    },

    question: {
      type: String,
      required: true,
      trim: true,
    },

    // ✅ OPTIONS AS ARRAY
    options: {
      type: [String],
      required: true,
      validate: {
        validator: function (arr) {
          return Array.isArray(arr) && arr.length >= 2;
        },
        message: "At least two options are required",
      },
    },

    // ✅ INDEX of correct option (0-based)
    correctAnswerIndex: {
      type: Number,
      required: true,
      min: 0,
    },

    explanation: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const addQuiz =
  mongoose.models.addQuiz || mongoose.model("SchoolQuiz/allQuestions", addQuizSchema);
export default addQuiz;
