import { verifyTokenHelper } from "./utils/jwt.js"; // ✅ correct import
// it is use for authentication whether you are authorised to access. 
export function isLoggedin(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({ message: "Please Login or Signup" });

  const token = authHeader.split(" ")[1]; // ## yaha tocken seperate kiya jaa raha hai 
  if (!token) return res.status(401).json({ message: "Please Login or Signup" });

  try {
    const decoded = verifyTokenHelper(token); // ya uper seh "token" leh k pass kr raha hai verify krna k liya
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT verification error:", err.message);
    return res.status(401).json({ message: "Please Login or Signup" });
  }
}
