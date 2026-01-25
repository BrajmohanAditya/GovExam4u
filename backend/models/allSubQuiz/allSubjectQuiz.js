import mongoose from "mongoose";

const allSubjectSchema = new mongoose.Schema(
  {
    // e.g. "Set 1", "Set 2"
    set: {
      type: String,
      required: true,
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
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const AllSubjectQuiz =
  mongoose.models.AllSubjectQuiz || mongoose.model("AllSubjectQuiz", allSubjectSchema);
export default AllSubjectQuiz;