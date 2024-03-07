import express from "express";
import bodyParser from "body-parser";

// importing the routes
import todosRoute from "./routes/todos.js";

const app = express();

app.use(bodyParser.json());
app.use(todosRoute);
app.listen(3000);
