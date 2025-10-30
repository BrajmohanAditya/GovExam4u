import User from "../models/user.js";
import bcrypt from "bcryptjs";
const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body; // Extract user details from request body
  try {
    const findedEmail = await User.findOne({ email });
    if (findedEmail) {
      const error = new Error("Email already registered");
      error.status = 400; 
      throw error;
    }
    const hashedPassword = await bcrypt.hash(password, 12); // Hash the password
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save(); 
    res.status(201).json({
      status: true,
      message: "User registered successfully",
    });
    // Check if the user already exists
  } catch (error) {
    next(error);
  }
}       

export default registerUser;