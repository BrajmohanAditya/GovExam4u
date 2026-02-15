import mongoose from "mongoose";

const registerOtpSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: Number },
    send_time: { type: Number },
  },
  { timestamps: true },
);

const RegisterOtp =
  mongoose.models.RegisterOtp ||
  mongoose.model("RegisterOtp", registerOtpSchema);
export default RegisterOtp;
