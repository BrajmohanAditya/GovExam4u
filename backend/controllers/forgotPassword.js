import User from "../models/user.js";

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
        new Date().getTime -
          new Date(findedUser.password_otp.last_attempt).getTime() <=
        24 * 60 * 60 * 1000;
      if (!timeDiff) {
        findedUser.password_otp.limit = 5;
        
      }
    }

  } catch (error) {
    next(error);
  }
};
export default forgotPassword;
