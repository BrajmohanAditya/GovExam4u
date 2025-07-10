const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

// Template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../frontend/src/pages")); // important

app.get("/", (req, res) => {
  res.send("Hi i am root");
});

// descriptive route
app.get("/descriptive", (req, res) => {
  res.render("descriptive");
});

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
