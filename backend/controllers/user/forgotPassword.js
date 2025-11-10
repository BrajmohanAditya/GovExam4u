import User from "../../models/user.js";
import sendEmail from "../../utils/sendMail.js";


const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const findedUser = await User.findOne({ email: email });
    if (!findedUser) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }

    const userOtp = findedUser.password_otp?.otp;
    if (userOtp) {
      const timeDiff =
        new Date().getTime() -
          new Date(findedUser.password_otp.last_attempt).getTime() <=
        24 * 60 * 60 * 1000;
      if (!timeDiff) {
        findedUser.password_otp.limit = 5;
        await findedUser.save();
      }
      const remainLimit = findedUser.password_otp.limit == 0;
      if (timeDiff && remainLimit) {
        const error = new Error(
          "OTP request limit reached. Please try again later."
        );
        error.status = 400;
        throw error;
      }
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    findedUser.password_otp.otp = otp;
    findedUser.password_otp.last_attempt = new Date();
    findedUser.password_otp.limit--;
    findedUser.password_otp.send_time = new Date().getTime() + 5 * 60 * 1000; // 2 minutes later
    await findedUser.save();
    const data = {
      email: email,
      otp: otp,
    }

    const result = await sendEmail(data);
    // console.log(result);
    res
      .status(200)
      .json({
        message: `otp sent at ${email}`,
        status: true,
        otp: findedUser.password_otp.otp,
      });
  } catch (error) {
    next(error);
  }
};
export default forgotPassword;
