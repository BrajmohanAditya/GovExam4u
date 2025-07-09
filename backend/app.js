const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

// Set EJS as the template engine
app.set("view engine", "ejs");

// Set views directory (IMPORTANT)
app.set("views", path.join(__dirname, "../frontend/src/pages"));

app.get("/", (req, res) => {
  res.send("hai i am root");
});

// Route to render the EJS file
app.get("/descriptive", (req, res) => {
  res.render("descriptive"); // descriptive.ejs will be picked automatically
});

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
