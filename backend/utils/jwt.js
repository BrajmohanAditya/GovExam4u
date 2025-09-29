
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "mysupersecretcode";

// Generate token
export function generateToken(user) {  // yaha "user" signup k routes seh aa raha hai
  return jwt.sign({ id: user._id, username: user.username }, SECRET, {
    expiresIn: "90d",
  });
}

// Verify token helper
export function verifyTokenHelper(token) {
  return jwt.verify(token, SECRET);
}
