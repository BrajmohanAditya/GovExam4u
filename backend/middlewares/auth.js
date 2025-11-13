// import jwt from "jsonwebtoken";
// const auth = (req, res, next) => {
//   try {
//     const accessToken = req.cookies.accessToken;
//     if (!accessToken) {
//       const error = new Error("Login required");
//       error.status = 401;
//       throw error;
//     }
//     jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY, (error, decoded) => {
//       if (error) {
//         const error = new Error("Authentication failed");
//         error.status = 401;
//       }
//       req.email = decoded.email;
//     });
//     next();  
//   } catch (error) {
//     next(error);
//   }};
// export default auth;

import jwt from "jsonwebtoken";
import User from "../models/user.js";

const auth = async (req, res, next) => {
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

export default auth;
