import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";
// const googleAuth = async (req, res, next) => {
//   try {
//     const findedUser = await User.findOne({ email: req.user?._json?.email });
//     let savedUser;
//     if (!findedUser) {
//       // will restrict duplicate data entry
//       const newUser = new User({
//         name: req.user?._json?.name,
//         email: req.user?._json?.email,
//       });
//       savedUser = await newUser.save();
//     }
 
//     const accessToken = generateToken(
//       findedUser ? findedUser.email : savedUser.email
//     );
//     res.cookie("accessToken", accessToken, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "none",
//       // domain: "govexam4u.com",
//       path: "/",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     next();
//   } catch (error) {
//     next(error);
//   }
// };

const googleAuth = async (req, res, next) => {
  try {
    const email = req.user?.emails?.[0]?.value; // ⭐ REAL GOOGLE EMAIL

    if (!email) {
      return res.status(400).json({ message: "Google login failed" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await new User({
        name: req.user.displayName,
        email: email,
      }).save();
    }

    const accessToken = generateToken(user.email);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    next();
  } catch (error) {
    next(error);
  }
};


export default googleAuth;
