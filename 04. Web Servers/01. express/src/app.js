const express = require("express");

const app = express();

app.get("", (req, res) => {
  res.send("Home Page");
});

app.get("/about", (req, res) => {
  res.send("about page");
});

app.get("/help", (req, res) => {
  res.send("help page");
});

app.get("/weather", (req, res) => {
  res.send("weather page");
});

app.listen(3000, () => {
  console.log("Server is Listening");
});
