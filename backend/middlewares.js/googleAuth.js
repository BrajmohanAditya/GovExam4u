import User from "../models/user.js";

const googleAuth = async (req, res, next) => {
  try {
    const findedUser = await User.findOne({ email: req.user?._json?.email });
    let savedUser;
    if (!findedUser) { // will restrict duplicate data entry 
      const newUser = new User({
        name: req.user?._json?.name,
        email: req.user?._json?.email,
      });
      const savedUser = await newUser.save();
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default googleAuth;
