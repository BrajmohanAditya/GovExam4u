
// ============================
// 1️⃣ Dependencies
// ============================


import dotenv from "dotenv";
dotenv.config(); // sabse pehle load karo

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import path from "path";  
import fs from "fs";
import { fileURLToPath } from "url";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import connectDB from "./utils/getConnection.js";
import userRoutes from "./routes/user.js";
import errorHandler from "./middlewares/errorHandler.js";
// ============================
// 2️⃣ Routes Imports
// ============================
import examTrackRoute from "./routes/examTrack.js";
import googleAuth from "./middlewares/googleAuth.js";
// ============================
// 3️⃣ Path setup for ESM (__dirname fix)
// ============================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================
// 4️⃣ Express app setup
// ============================
const app = express(); 
const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.ATLASDB_URL;

// ============================
// 5️⃣ Middlewares
// ============================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      // "http://localhost:5173",
      "https://govexam4u.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
  
app.use( 
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, 
  })
);

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// ============================
// 6️⃣ Google OAuth Setup 
// ============================
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // callbackURL: "http://localhost:8080/auth/google/callback",
      callbackURL: "https://govexam4ubackend.onrender.com/auth/google/callback", 
      // google apna data ish url per send krta hai backend ko 
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log( profile);
      return done(null, profile);
    }
  ) 
);   

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user); 
});

// ============================
// 7️⃣ Auth Routes
// ============================
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);




app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    // failureRedirect: "http://localhost:5173/login",
    failureRedirect: "https://govexam4u.com/login",
  }),
  googleAuth, // yahi middleware data ko database meh saave krta hai
  (req, res) => {
    // redirect frontend after success login
    // res.redirect("http://localhost:5173/");
    res.redirect("https://govexam4u.com/");

  }
);




// ============================
// 8️⃣ MongoDB Connection
// ============================

connectDB();



// ============================
// 9️⃣ Routes
// ============================
app.use("/examTrack", examTrackRoute); 
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hai, I am root");
});

// ============================
// 🔟 Serve React Build (Optional)
// ============================
// const clientBuildPath = path.join(__dirname, "client/build");

// if (fs.existsSync(clientBuildPath)) {
//   app.use(express.static(clientBuildPath));

//   app.get("*", (req, res, next) => {
//     if (req.path.startsWith("/examTrack") || req.path.startsWith("/users"))
//       return next();
//     res.sendFile(path.join(clientBuildPath, "index.html"));
//   });
// } else {
//   console.warn("⚠️ React build folder not found! Skipping static serving.");
// }



// ============================
// 1️⃣1️⃣ Error Handling Middleware
// ============================
app.use(errorHandler);
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).json({
    success: false,
    error: message,
  });
});
 
// ============================
// 1️⃣2️⃣ Start Server
// ============================
app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});
 


