import mongoose from "mongoose";

const SetLiveSchema = new mongoose.Schema(
  {
    set: {
      type: String,
      required: true,
      unique: true,
    },
    isLive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const SetLive = mongoose.model("allSubjectQuiz/SetLive", SetLiveSchema);
export default SetLive;
