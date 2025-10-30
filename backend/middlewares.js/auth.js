import jwt from "jsonwebtoken";
const auth = (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
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
  }
};
export default auth;