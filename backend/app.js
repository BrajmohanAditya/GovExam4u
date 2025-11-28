// ============================
// 1️⃣ Dependencies
// ============================

dotenv.config(); // sabse pehle load karo
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import connectDB from "./utils/getConnection.js";
import userRoutes from "./routes/user.js";
import liveMockRoute from "./routes/liveMock.js"
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

// ============================
// 5️⃣ Middlewares
// ============================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const CLIENT_URL =
  process.env.NODE_ENV === "production"
    ? process.env.CLIENT_URL_PROD
    : process.env.CLIENT_URL_DEV;

app.use(
  cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);



app.use(cookieParser());
app.use(passport.initialize());
// app.use(passport.session());

// ============================
// 6️⃣ Google OAuth Setup
// ============================
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // callbackURL: "http://localhost:8080/auth/google/callback",
      callbackURL: "https://api.govexam4u.com/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log( profile);
      return done(null, profile);
    }
  )
);



// ============================
// 7️⃣ Auth Routes
// ============================
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
    session: false,
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://govexam4u.com/login",
    session: false,
  }),
  googleAuth, // yahi middleware data ko database meh saave krta hai
  (req, res) => {
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
app.use("/liveMock", liveMockRoute);


app.get("/", (req, res) => {
  res.send("Hai, I am root");
});

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
