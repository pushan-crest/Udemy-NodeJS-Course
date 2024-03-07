import { Router } from "express";
import { Todo } from "../models/todos";
import { format } from "date-fns";

const router = Router();

let todos: Todo[] = [];

type ReadBody = { title: string; completed: boolean };
type ReadParams = { todoid: string };

router.get("/", (req, res, next) => {
  res.status(200).send({ todo: todos });
});

router.post("/todo", (req, res, next) => {
  const body = req.body as ReadBody;
  const newTodo: Todo = {
    id: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSXXX"),
    title: body.title,
    completed: body.completed,
  };
  todos.push(newTodo);
  res.status(201).send({ message: "Todos Added!" });
});

router.put("/todo/:todoid", async (req, res, next) => {
  const body = req.body as ReadBody;
  const params = req.params as ReadParams;
  const id = params.todoid;
  const index = todos.findIndex((todo) => todo.id === id);
  if (index >= 0) {
    todos[index] = {
      id: id,
      title: body.title,
      completed: body.completed,
    };
    return res.status(200).json({ message: "Todo Updated ", todo: todos });
  }
  res.status(404).json({ message: "Todo Not Found" });
});

// create new route for delete todos using id similar to above
router.delete("/todos/:todoid", async (req, res, next) => {
  const params = req.params as ReadParams;
  const id = params.todoid;
  const index = todos.findIndex((todo) => todo.id === id);
  if (index >= 0) {
    todos.splice(index, 1);
    res.status(200).json({ message: "Todo Deleted" });
  }
  res.status(404).json({ message: "Todo Not Found" });
});

export default router;
