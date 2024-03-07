import {
  MongoClient,
  Database,
} from "https://deno.land/x/mongo@v0.32.0/mod.ts";

let db: Database;

export function connect() {
  const dbName = "todo-app";
  const client = new MongoClient();
  client.connect(
    `mongodb+srv://vehasa5441:xd2qAVSflAeEsCkM@cluster0.hnwivk1.mongodb.net/${dbName}?retryWrites=true&w=majority&authMechanism=SCRAM-SHA-1`
  );

  db = client.database("todo-app");
}

export function getDb() {
  return db;
}
