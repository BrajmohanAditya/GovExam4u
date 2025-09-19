// aim: login logout signup ,  work: signUp  client side validation

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

// 🎯 User schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // har email unique hona chahiye
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"], // client side validation ke sath server side bhi
    },
  },
  { timestamps: true } // auto createdAt & updatedAt fields
);

// 🔥 passport-local-mongoose username & password field add karega automatically
//  - Adds: hash, salt
//  - Provides: .register(), .authenticate(), etc.
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);

//---
 
