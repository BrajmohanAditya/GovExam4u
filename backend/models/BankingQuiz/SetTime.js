import mongoose from "mongoose";

const setTimeSchema = new mongoose.Schema({
  set: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
    default: 10,
  },
});

const SetTime = mongoose.models.SetTime || mongoose.model("SetTime", setTimeSchema);
export default SetTime;
