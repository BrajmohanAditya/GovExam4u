import RegisterOtp from "../../models/registerOtp.js";
import User from "../../models/loginLogout.js";

const verifyRegisterOtp = async (req, res, next) => {
  const { otp } = req.body;
  try {
    const record = await RegisterOtp.findOne({ otp });
    if (!record) {
      const error = new Error("incorrect otp");
      error.statusCode = 400;
      throw error;
    }
    const isExpired = record.send_time < new Date().getTime();
    if (isExpired) {
      const error = new Error("otp expired");
      error.statusCode = 400;
      throw error;
    }

    // create user
    const existing = await User.findOne({ email: record.email });
    if (existing) {
      const error = new Error("Email already registered");
      error.statusCode = 400;
      throw error;
    }

    const newUser = new User({
      name: record.name,
      email: record.email,
      password: record.password,
    });
    await newUser.save();

    // cleanup
    await RegisterOtp.deleteOne({ _id: record._id });

    res.status(200).json({ success: true, message: "Registration successful" });
  } catch (error) {
    next(error);
  }
};

export default verifyRegisterOtp;
