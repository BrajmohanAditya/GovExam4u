import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function run() {
  await mongoose.connect(process.env.ATLASDB_URL);
  const res = await mongoose.connection.db.collection('times').find({}).toArray();
  console.log("Times collection:", res);
  process.exit(0);
}

run();
