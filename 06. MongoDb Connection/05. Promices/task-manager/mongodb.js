const { MongoClient } = require("mongodb");

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "task-manager";

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  const col = db.collection("users");
  let user_data = await col.find({ age: 27 }).toArray();

  console.log(user_data);

  user_data = await col.find({ age: 27 }).toArray((error, users) => {
    console.log(users);
  });

  console.log(user_data);

  //   db.collection("tasks").findOne(
  //     { _id: "5c0fec243ef6bdfbe1d62e2f" },
  //     (error, task) => {
  //       console.log(task);
  //     }
  //   );

  //   db.collection("tasks")
  //     .find({ completed: false })
  //     .toArray((error, tasks) => {
  //       console.log(tasks);
  //     });

  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
