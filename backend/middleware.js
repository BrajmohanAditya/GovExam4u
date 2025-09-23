import { verifyTokenHelper } from "./utils/jwt.js"; // ✅ correct import

export function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({ message: "Please Login or Signup" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Please Login or Signup" });

  try {
    const decoded = verifyTokenHelper(token); // ✅ use helper
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT verification error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
