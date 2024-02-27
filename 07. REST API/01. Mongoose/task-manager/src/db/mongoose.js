const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api");

// Model is like making the schema for a collection and nameing it
const User = mongoose.model("user_data", {
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
});

// Adding a document to the collection
const me = new User({
  name: "Andrew",
  age: 32,
});

me.save()
  .then(() => {
    console.log(me);
  })
  .catch((error) => {
    console.log("Error!", error);
  });
