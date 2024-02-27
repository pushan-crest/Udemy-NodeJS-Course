const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    // Built in Validators
    // - Numbers: min & max
    // - Required
    // - Strings: enum, match & maxlength

    title: {
      type: String,
      // this is used to validate the field
      required: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,

      // we can assign a default value to the keys
      default: "nothing",
    },
    completed: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamp: true,
  }
);

const Task = mongoose.model("tasks", taskSchema);

module.exports = Task;

// ============================================

// const task1 = new Task({
//   title: "First Task",
//   description: "the description of the first task",
// });

// task1
//   .save()
//   .then(() => {
//     console.log(task1);
//   })
//   .catch((e) => {
//     console.log("Error!!!");
//   });
