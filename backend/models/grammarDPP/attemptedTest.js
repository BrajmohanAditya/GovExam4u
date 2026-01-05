import mongoose from "mongoose";

const Schema = mongoose.Schema;

const submitTestSchema = new Schema(
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
submitTestSchema.index({ userId: 1, set: 1 }, { unique: true });

const attemptedTest = mongoose.model("attemptedTest", submitTestSchema);

export default attemptedTest;