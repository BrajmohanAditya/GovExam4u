import jwt from "jsonwebtoken";
const auth = (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      const error = new Error("Login required");
      error.status = 401;
      throw error;
    }
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY, (error, decoded) => {
      if (error) {
        const error = new Error("Authentication failed");
        error.status = 401;
      }
      req.email = decoded.email;
    });
    next();  
  } catch (error) {
    next(error);
  }};
export default auth;