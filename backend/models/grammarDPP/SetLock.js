// models/grammarDPP/SetLock.js
import mongoose from "mongoose";

const setLockSchema = new mongoose.Schema(
  {
    set: {
      type: String,
      required: true,
      unique: true,
    },
    isLocked: {
      type: Boolean,
      default: false,
    },
    lockedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "registeredUser",
    },
    lockedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const SetLock =
  mongoose.models.SetLock || mongoose.model("SetLock", setLockSchema);

export default SetLock;
