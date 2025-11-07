import User from "../../models/user.js";
import generateToken from "../../utils/generateToken.js";
const verifyOtp = async (req, res, next) => {
  const { otp } = req.body;

  try {
    const findedUser = await User.findOne({"password_otp.otp":otp});
    if (!findedUser) {
        const error = new Error("incorrect otp");
        error.statusCode = 400;
        throw error;
    }
    const isExprire = findedUser?.password_otp?.send_time  < new Date().getTime();
    if (isExprire) {
        const error = new Error("otp expired");
        error.statusCode = 400;
        throw error;
    }
    findedUser.password_otp.otp = null;
    await findedUser.save();
    const accessToken = generateToken(findedUser.email);
    res.cookie("accessToken", accessToken);

    res.status(200).json({
      success: true,
      message: "otp verified successfully",
    }); 

  } catch (error) {
    next(error);
  }
};

export default verifyOtp;