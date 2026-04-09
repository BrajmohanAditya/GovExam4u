import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

import SubmittedTest from "./models/BankingQuiz/submittedTest.js";

const clearAttempts = async () => {
  try {
    const url = process.env.ATLASDB_URL;
    console.log("Connecting to:", url.substring(0, 40) + "...");
    await mongoose.connect(url);
    console.log("Connected to MongoDB Atlas.");

    const result = await SubmittedTest.deleteMany({ set: "English - Set 1" });
    console.log(`Deleted ${result.deletedCount} previous attempts for 'English - Set 1'.`);

    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
};

clearAttempts();
