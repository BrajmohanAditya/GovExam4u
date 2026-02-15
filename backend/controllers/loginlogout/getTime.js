import User from "../../models/loginLogout.js";
import RegisterOtp from "../../models/registerOtp.js";

const getTime = async (req, res, next) => {
  const { email } = req.body;
  try {
    let time = null;
    const findedUser = await User.findOne({ email: email });
    if (findedUser) {
      time = findedUser?.password_otp?.send_time || null;
    } else {
      // check temporary registration OTP store
      const reg = await RegisterOtp.findOne({ email: email });
      if (reg) {
        time = reg.send_time || null;
      }
    }
    if (!time) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
    res.status(200).json({ message: "otp sent", status: true, time });
  } catch (error) {
    next(error);
  }
};

export default getTime;
