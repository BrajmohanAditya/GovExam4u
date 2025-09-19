const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");

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

module.exports = router;

