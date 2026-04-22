import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    studentClass: { type: String, required: true },
    status: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "unpaid",
    },
    whatsappNo: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);

export default Student;
