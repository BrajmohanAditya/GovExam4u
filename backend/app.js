require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ExpressError = require("./utils/ExpressError");
const cors = require("cors");
const examTrackRoute = require("./routes/examTrack.js"); // step - (3a)

// aim: "Implementing session",  work: require
const session = require("express-session");   
const MongoStore = require("connect-mongo"); 
//---


// Establishing connection to Data base ---> (Step-2)
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


// aim: "implementing session", 
const store = MongoStore.create({
  mongoUrl: process.env.ATLASDB_URL,
  crypto: {
    secret: "mysupersecretcode",
  },
  touchAfter: 24 * 3600,
});

store.on("error", ()=>{
  console.log("error in mongo session store", err)
}); 
const sessionOptions = {
  store,
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {  
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};
//------------





app.use(session(sessionOptions));
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










app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});


//aim: Adding server side validation, # gloval middle malware.
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "something went wrong" } = err;
  // res.render("error.ejs", { message });
  res.status(statusCode).json({
    // bina ya line k hopscotch meh status ok nahi milaga.
    success: false,
    error: message,
  });
}); // # jb koi error aya or koi route nahi work kara toh express khud hi ishko call kr deta hai or server crash nahi hota

  
app.listen(PORT, () => {
  console.log("server is listening to port 8080${PORT}");
});
 