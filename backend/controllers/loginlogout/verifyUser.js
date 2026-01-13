// controllers/user/verifyUser.js
import jwt from "jsonwebtoken";
import User from "../../models/loginLogout.js";

const verifyUser = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).json({ message: " Please Login " });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ loggedIn: false });
    }

    res.status(200).json({
      loggedIn: true,
      user,
    });
  } catch (err) {
    console.error(err);
    res
      .status(401)
      .json({ loggedIn: false, message: "Invalid or expired token" });
  }
};

export default verifyUser;
