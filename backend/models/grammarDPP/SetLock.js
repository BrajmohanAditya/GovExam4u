// backend/models/SetLock.js
import mongoose from "mongoose";

const SetLockSchema = new mongoose.Schema(
  {
    set: {
      type: String,
      required: true,
      unique: true, // ek set ka ek hi lock record
    },
    isLocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const SetLock = mongoose.model("grammarDPP/SetLock", SetLockSchema);
export default SetLock;
