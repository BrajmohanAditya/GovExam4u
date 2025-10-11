// import dotenv from "dotenv";
// dotenv.config(); // sabse pehle

// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// const cookieParser = require("cookie-parser");
// const session = require("express-session");
// import path from "path";
// import fs from "fs";
// import { fileURLToPath } from "url";

// import examTrackRoute from "./routes/examTrack.js";
// import userRouter from "./routes/users.js";

// // __dirname fix for ESM
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const GoogleStrategy = require("passport-google-oauth20").Strategy;

// // Express app
// const app = express();
// const PORT = process.env.PORT || 8080;
// const MONGO_URL = process.env.ATLASDB_URL;

// // Middlewares
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://govexam4u-frontend.onrender.com",
//       "https://govexam4u.com",
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );
// app.use(
//   session({
//     secret: "secret",
//     resave: false,
//     saveUninitialized: true,
//   })
// );
// app.use(cookieParser());
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:8080/auth/google/callback",
//     },
//     (accessToken, refreshToken, profile, done) => {
//       return done(null, profile); 
//     }
//   )
// );
// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });


// app.get(
//   "/auth/google",
//   passport.authenticate("google", {
//     scope: ["profile", "email"],
//     prompt: "select_account",
//   })
// );

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "http://localhost:5173/login",
//   }),
//   goooleAuth,
//   (req, res, next) => {
//     res.redirect("http://localhost:8080/");
//   }
// );

// getConnection();

// // DB connect
// async function main() {
//   try {
//     await mongoose.connect(MONGO_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("✅ Connected to MongoDB");
//   } catch (err) {
//     console.error("❌ DB Connection Error:", err.message); 
//     process.exit(1);
//   }
// }
// main();





// // Routes
// app.use("/examTrack", examTrackRoute);
// app.use("/", userRouter);

// app.get("/", (req, res) => {
//   res.send("Hai, I am root");
// });

// // React build serve
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

// app.use((err, req, res, next) => {
//   let { statusCode = 500, message = "something went wrong" } = err;
//   // res.render("error.ejs", { message });
//   res.status(statusCode).json({
//     // bina ya line k hopscotch meh status ok nahi milaga.
//     success: false,
//     error: message,
//   });
// });

// // Server start
// app.listen(PORT, () => {
//   console.log(`🚀 Server is listening on port ${PORT}`);
// });
// ============================
// 1️⃣ Dependencies
// ============================


import dotenv from "dotenv";
dotenv.config(); // sabse pehle load karo

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

// ============================
// 2️⃣ Routes Imports
// ============================
import examTrackRoute from "./routes/examTrack.js";
import userRouter from "./routes/users.js";

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
      // "https://govexam4u-frontend.onrender.com",
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
    cookie: { secure: true },
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
      console.log( profile);
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




// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "http://localhost:5173/login",
//   }),
//   (req, res) => {
//     // redirect frontend after success login
//     res.redirect("http://localhost:5173/");
//   }
// );

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://govexam4u.com/login",
  }),
  (req, res) => {
    res.redirect("https://govexam4u.com/"); // after successful login
  }
);



// ============================
// 8️⃣ MongoDB Connection
// ============================
async function connectDB() {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ DB Connection Error:", err.message);
    process.exit(1);
  }
}
connectDB();

// ============================
// 9️⃣ Routes
// ============================
app.use("/examTrack", examTrackRoute);
app.use("/", userRouter);

app.get("/", (req, res) => {
  res.send("Hai, I am root");
});

// ============================
// 🔟 Serve React Build (Optional)
// ============================
const clientBuildPath = path.join(__dirname, "client/build");

if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));

  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/examTrack") || req.path.startsWith("/users"))
      return next();
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
} else {
  console.warn("⚠️ React build folder not found! Skipping static serving.");
}

// ============================
// 1️⃣1️⃣ Error Handling Middleware
// ============================
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
 


