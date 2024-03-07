import { Router } from "https://deno.land/x/oak/mod.ts";

// todo model
import { Todo } from "../models/todo.ts";

let todos: Todo[] = [];
// creating instance of the router
const router = new Router();

router.get("/todos", async (ctx: any) => {
  ctx.response.body = { todos };
});

router.post(
  "/todos",
  async ({ request, response }: { request: any; response: any }) => {
    const data = await request.body.json();
    const todo: Todo = {
      id: new Date().toISOString(),
      title: data.title,
      completed: data.completed,
    };
    todos.push(todo);
    response.body = { message: "created Todo", todo };
  }
);

router.put(
  "/todos/:todoid",
  async ({
    request,
    response,
    params,
  }: {
    request: any;
    response: any;
    params: any;
  }) => {
    const data = await request.body.json();
    const tid = params.todoid;
    console.log(data, tid);
    const todoindex = todos.findIndex((todo) => todo.id === tid);
    todos[todoindex] = {
      id: todos[todoindex].id,
      title: data.title,
      completed: data.completed,
    };
    response.body = { message: "updated Todo", todo: todos[todoindex] };
  }
);

router.delete("/todos/:id", async (ctx: any) => {
  const tid = await ctx.params.id;
  todos = todos.filter((todo) => todo.id !== tid);
  ctx.response.body = { message: "Todo Delted" };
});

export default router;
