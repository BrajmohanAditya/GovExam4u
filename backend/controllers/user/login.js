import User from "../../models/user.js";
import bcrypt from "bcryptjs";
import generateToken from "../../utils/generateToken.js";

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try { 
    const findedUser = await User.findOne({ email: email });
    if (!findedUser) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
    const isPassMatch = await bcrypt.compare(password, findedUser.password);
    if (!isPassMatch) {
        const error = new Error("Invalid password");
        error.status = 401;
        throw error;

    }
    const accessToken = generateToken(findedUser.email);
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
    });
    res.status(200).json({ message: "Login successful", status: "true" });
  } catch (error) {
    next(error);}
};
export default login;
