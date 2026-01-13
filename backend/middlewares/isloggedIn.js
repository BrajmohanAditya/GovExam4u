//Ye middleware har request ko check karta hai ki user login hai ya nahi. Agar login hai to next route call kr deta hai
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const isLoggedIn = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({ message: "Login required" });
    }

    // verify token
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY);

    // check user in DB
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    req.user = user; // full user object
    req.email = user.email; // or email only
    next();
  } catch (err) {
    return res.status(401).json({ message: "Authentication failed" });
  }
};

export default isLoggedIn;   //  isLoggedIn = isLoggedIn
