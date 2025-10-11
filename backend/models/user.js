

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    password: { type: String },
    password_otp: {
      type: String,
      send_time: { type: String },
      limit: { type: Number, default: 5 },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;   // ✅ ES Module export
