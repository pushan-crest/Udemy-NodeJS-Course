const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api");

/*
All SchemaTypes have the built-in required validator. The required validator uses the SchemaType's checkRequired() function to determine if the value satisfies the required validator.

Numbers have min and max validators.

Strings have enum, match, minLength, and maxLength validators.
*/

const Task = mongoose.model("Task", {
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    // providing custom validator
    validate(val) {
      if (val !== true || val !== false) {
        throw new Error("Invalid Input");
      }
    },
  },
});

const task = new Task({
  description: "Learn the Mongoose library",
  completed: 12,
});

task
  .save()
  .then(() => {
    console.log(task);
  })
  .catch((error) => {
    console.log(error);
  });
