
// import jwt from "jsonwebtoken";

// const SECRET = process.env.JWT_SECRET || "mysupersecretcode";

// // Generate token
// export function generateToken(user) {
//   return jwt.sign(
//     { id: user._id, username: user.username },
//     SECRET,
//     { expiresIn: "7d" } // token valid for 7 days
//   );
// }

// // Verify token (middleware helper)
// export function verifyToken(req, res, next) {
//   const authHeader = req.headers?.authorization; // optional chaining
//   // console.log("Authorization Header:", authHeader); // 👈 log full header

//   if (!authHeader) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const token = authHeader.split(" ")[1]; // Bearer <token>
//   // console.log("Extracted Token:", token); // 👈 log token

//   if (!token) {
//     return res.status(401).json({ message: "Invalid token" });
//   }

//   try {
//     const decoded = jwt.verify(token, SECRET);
//     // console.log("Decoded Payload:", decoded); // 👈 log decoded payload
//     req.user = decoded; // attach user info
//     next();
//   } catch (err) {
//     console.error("JWT verification error:", err.message); // 👈 log error details
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// }
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "mysupersecretcode";

// Generate token
export function generateToken(user) {
  return jwt.sign({ id: user._id, username: user.username }, SECRET, {
    expiresIn: "7d",
  });
}

// Verify token helper
export function verifyTokenHelper(token) {
  return jwt.verify(token, SECRET);
}
