const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");

// ✅ Signup Route (JSON response)
router.post(
  "/signup",
  wrapAsync(async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      // naya user object 
      const newUser = new User({ email, username });
      // passport-local-mongoose ka register()
      const registeredUser = await User.register(newUser, password);
      // Auto login after signup
      req.login(registeredUser, (err) => {
        if (err) return next(err);
        // ✅ React ke liye JSON response
        return res.status(201).json({
          success: true,
          message: "Signup successful!",
          user: {
            id: registeredUser._id,
            username: registeredUser.username,
            email: registeredUser.email,
          },
        });
      });
    } catch (e) {
      console.error("❌ Signup Error:", e.message);
      return res.status(400).json({
        success: false,
        message: e.message,
      });
    }
  })
);

// ✅ Login Route
router.post(
  "/login",
  passport.authenticate("local", { failureMessage: true }),
  (req, res) => {
    const user = req.user; // passport user
    return res.json({
      success: true,
      message: "Login successful!",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  }
);

// // Current logged-in user
// router.get("/current-user", (req, res) => {
//   if (req.isAuthenticated()) {
//     return res.json({ user: { id: req.user._id, username: req.user.username, email: req.user.email } });
//   }
//   return res.status(401).json({ user: null });
// });


// ✅ Logout Route
router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    return res.json({
      success: true,
      message: "Logged out successfully!",
    });
  });
});


module.exports = router;

