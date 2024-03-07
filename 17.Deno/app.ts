import { Application } from "https://deno.land/x/oak/mod.ts";
import todoRouter from "./routes/todos.ts";
const app = new Application();

app.use(todoRouter.routes());
app.use(todoRouter.allowedMethods());

app.listen({ port: 3000 });
