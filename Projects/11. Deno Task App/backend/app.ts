import { Application } from "https://deno.land/x/oak/mod.ts";
import todoRouter from "./routes/todos.ts";
import { connect } from "./helpers/db_client.ts";

connect();
const app = new Application();

app.use(async (ctx: any, next: any) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  ctx.response.headers.set(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS"
  );
  ctx.response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  await next();
});

app.use(todoRouter.routes());
app.use(todoRouter.allowedMethods());

app.listen({ port: 8000 });
