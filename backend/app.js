require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const examTrackRoute = require("./routes/examTrack.js"); // step - (3a)

// aim: "Implementing session",  work: require
const session = require("express-session");   
const MongoStore = require("connect-mongo"); 
//---
// aim: signup login logout 
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const userRouter = require("./routes/users.js");
//---  
const ExpressError = require("./utils/ExpressError");

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
//---


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

// app.use(session(sessionOptions)); // aim: "implementing session", 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//---

// aim: "implementing session", 
const store = MongoStore.create({
  mongoUrl: process.env.ATLASDB_URL,
  crypto: {
    secret: "mysupersecretcode",
  }, 
  touchAfter: 24 * 3600,
});
  
store.on("error", (err)=>{
  console.log("error in mongo session store", err)
}); 

// const sessionOptions = {
//   store,
//   secret: "mysupersecretcode",
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     secure: false,
//     expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//     httpOnly: true,
//   },
// };

const sessionOptions = {
  store,
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true, // HTTPS required
    httpOnly: true,
    sameSite: "none", // cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};



//---


// aim : signup  login logout 
app.use(session(sessionOptions)); // aim: "implementing session", 

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//---








 



// step - (3a) 
app.use("/examTrack", examTrackRoute); //("/call receive on this route", redirect to this file);
//--

app.use("/", userRouter); // aim:signup login logout, work: redirect. 




app.get("/debug-session", (req, res) => {
  res.json({
    cookies: req.headers.cookie,
    session: req.session,
    user: req.user || null,
  });
});


app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});


// //aim: Adding server side validation, # gloval middle malware.
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


