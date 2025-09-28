
  import dotenv from "dotenv";
  dotenv.config(); // sabse pehle

  import express from "express";
  import mongoose from "mongoose";
  import cors from "cors";
  import path from "path";
  import fs from "fs";
  import { fileURLToPath } from "url";

  import examTrackRoute from "./routes/examTrack.js";
  import userRouter from "./routes/users.js";


  // __dirname fix for ESM
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Express app
  const app = express();
  const PORT = process.env.PORT || 8080; 
  const MONGO_URL = process.env.ATLASDB_URL;
   
  // Middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: [
        "http://localhost:5173",
        "https://govexam4u-frontend.onrender.com",
        "https://govexam4u.com",
      ],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );

  // DB connect
  async function main() {
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
  main();

  // Routes
  app.use("/examTrack", examTrackRoute);
  app.use("/", userRouter);

  app.get("/", (req, res) => {
    res.send("Hai, I am root");
  });

  // React build serve
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
  
  // Error handler (ExpressError)
  // app.use((err, req, res, next) => {
  //   let { statusCode = 500, message = "Something went wrong" } = err;
  //   res.status(statusCode).json({
  //     success: false,
  //     error: message,
  //   });
  // });


app.use((err, req, res, next) => {
  let { statusCode = 500, message = "something went wrong" } = err;
  // res.render("error.ejs", { message });
  res.status(statusCode).json({
    // bina ya line k hopscotch meh status ok nahi milaga.
    success: false,
    error: message,
  });
});

  // Server start
  app.listen(PORT, () => {
    console.log(`🚀 Server is listening on port ${PORT}`);
  });




