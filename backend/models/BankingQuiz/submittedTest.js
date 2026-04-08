import mongoose from "mongoose";

const Schema = mongoose.Schema;

const submittedTestSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "registeredUser", // same as your system
      required: true,
    },
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    set: {
      type: String, // e.g. "Set-1"
      required: true,
    },

    score: {
      type: Number,
      default: 0,
    },
    answers: {
      type: Map,
      of: Number, // questionId -> selectedOptionIndex
    },

    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// 🔥 ONE USER → ONE SET → ONE TIME
submittedTestSchema.index({ userId: 1, set: 1 }, { unique: true });

const submittedTest = mongoose.model("bankingQuiz/submittedTest", submittedTestSchema);

export default submittedTest;