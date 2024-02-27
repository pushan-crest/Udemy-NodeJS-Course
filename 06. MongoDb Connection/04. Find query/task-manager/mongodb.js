// CRUD create read update delete

const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database!");
    }
    const db = client.db(databaseName);
    console.log(`connected`);

    // db.collection("users").findOne(
    //   { _id: new ObjectID("65d572197d8f7b1a40f8deab") },
    //   (error, user) => {
    //     if (error) {
    //       return console.log("Unable to fetch");
    //     }

    //     console.log(user);
    //   }
    // );

    db.collection("users")
      .find({ age: 27 })
      .toArray((error, users) => {
        console.log(users);
      });

    // db.collection("tasks").findOne(
    //   { _id: new ObjectID("65d573b6cce88c1a64674559") },
    //   (error, task) => {
    //     console.log(task);
    //   }
    // );

    // db.collection("tasks")
    //   .find({ completed: false })
    //   .toArray((error, tasks) => {
    //     console.log(tasks);
    //   });
  }
);
