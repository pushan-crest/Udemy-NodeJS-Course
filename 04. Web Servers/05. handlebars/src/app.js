const path = require("path");
const express = require("express");

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");

// setting hbs - view engine
app.set("view engine", "hbs");

// Setting default view
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  // render method is used to render the webpage
  res.render("index", {
    title: "Weather",
    name: "Andrew Mead",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Andrew Mead",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
  });
});

app.get("/weather", (req, res) => {
  res.send({
    forecast: "It is snowing",
    location: "Philadelphia",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
