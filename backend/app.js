require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const examTrackRoute = require("./routes/examTrack.js"); // step - (3a)

// Establishing connection to Data base ---> (Step-2)
// const MONGO_URL = "mongodb://127.0.0.1:27017/govexam4u";  // govexam4u is a data base
const PORT = process.env.PORT || 8080
const MONGO_URL = process.env.ATLASDB_URL;

main()
  .then(() => {
    //  calling main method
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  // ya main method raha
  await mongoose.connect(MONGO_URL);
}
//--
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

// step - (3a) aim: jo v call "/examTrac" seh aya usko examTrackRoute yaha redirect kr doh.
app.use("/examTrack", examTrackRoute); //("/call receive on this route", redirect to this file);
//--

app.get("/", (req, res) => {
  res.send("Hi i am root Babu");
});

app.listen(PORT, () => {
  console.log("server is listening to port 8080${PORT}");
});
