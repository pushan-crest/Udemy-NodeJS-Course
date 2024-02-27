const express = require("express");
const app = express();

// Connecting to the database
require("./db/mongoose");

// defining the port
const port = 3000;

// Automatic parsing output to JSON
app.use(express.json());

// importing router files
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

// This will
app.use(userRouter);
app.use(taskRouter);

// Listning to port
app.listen(port, () => {
  console.log("Server is Up on port " + port);
});
