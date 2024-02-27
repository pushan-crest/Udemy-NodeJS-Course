// Core Module
const path = require("path");

const express = require("express");

const app = express();

// used to get the full current directory path
console.log(__dirname);

// used to get the full current file path
console.log(__filename);

// path.join is used to join the two paths
const publicDirectoryPath = path.join(__dirname, "../public");

// setting default path for the website
app.use(express.static(publicDirectoryPath));

app.get("/weather", (req, res) => {
  res.send({
    forecast: "It is snowing",
    location: "Philadelphia",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
