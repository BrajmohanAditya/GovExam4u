
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
