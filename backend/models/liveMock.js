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

const livemockdb =
  mongoose.models.liveMockDB || mongoose.model("livemockdb", userSchema);

export default livemockdb; // ✅ ES Module export
