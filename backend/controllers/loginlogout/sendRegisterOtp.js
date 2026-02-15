import RegisterOtp from "../../models/registerOtp.js";
import User from "../../models/loginLogout.js";
import sendEmail from "../../utils/sendMail.js";
import bcrypt from "bcryptjs";

const sendRegisterOtp = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      const error = new Error("Email already registered");
      error.status = 400;
      throw error;
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const send_time = new Date().getTime() + 10 * 60 * 1000; // 10 minutes

    const hashedPassword = await bcrypt.hash(password, 12);

    // Upsert registration record
    await RegisterOtp.findOneAndUpdate(
      { email },
      { name, email, password: hashedPassword, otp, send_time },
      { upsert: true, new: true },
    );

    // send email
    await sendEmail({ email, otp });

    res
      .status(200)
      .json({ status: true, message: "OTP sent to email", time: send_time });
  } catch (error) {
    next(error);
  }
};

export default sendRegisterOtp;
