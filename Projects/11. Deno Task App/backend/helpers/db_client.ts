// import mongoose in deno

import {
  MongoClient,
  Database,
} from "https://deno.land/x/mongo@v0.32.0/mod.ts";

let db: Database;

export async function connect() {
  const client = new MongoClient();

  const dbName = "todolist";

  await client.connect(
    `mongodb+srv://vehasa5441:xd2qAVSflAeEsCkM@cluster0.hnwivk1.mongodb.net/${dbName}?retryWrites=true&w=majority&authMechanism=SCRAM-SHA-1`
  );

  db = client.database(dbName);
}

export function getDb() {
  return db;
}
