import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    date: { type: String, required: true },
    exam: { type: String, required: true },
    link: { type: String, required: true },
  },
  { timestamps: true }
);

const LiveMock =
  mongoose.models.liveMockDB || mongoose.model("liveMockDB", userSchema);

export default LiveMock; // ✅ ES Module export
