import mongoose from "mongoose";
import SubmittedTest from "./models/BankingQuiz/submittedTest.js";
import dotenv from "dotenv";

dotenv.config();

async function run() {
  await mongoose.connect(process.env.ATLASDB_URL);
  const res = await SubmittedTest.deleteMany({});
  console.log("Deleted all submitted tests:", res);
  process.exit(0);
}

run();
