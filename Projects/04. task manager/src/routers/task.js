const express = require("express");
const router = new express.Router();
const isAuth = require("../middleware/auth");

// connecting the models
const Task = require("../models/task");
const User = require("../models/user");

// ==================== Creating New Task =========================

router.post("/tasks", isAuth, async (req, res) => {
  // const new_task = new Task(req.body);

  const new_task = new Task({
    ...req.body,
    user: req.user._id,
  });

  try {
    await new_task.save();
    res.status(201).send(new_task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// ====================== Finding all Tasks of current user =====================

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt:desc
router.get("/tasks", isAuth, async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    await req.user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send();
  }
});

// ======================= Finding task by ID ===================

router.get("/tasks/:id", isAuth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOne({ _id, user: req.user._id });
    if (!task) {
      res.status(404).send("task not found");
    }
    res.status(200).send(task);
  } catch (err) {
    res.status(500).send(err);
  }
});

// ======================== Updating a Task =====================

router.patch("/tasks/:id", isAuth, async (req, res) => {
  const _id = req.params.id;

  const allowed_updates = ["title", "description", "completed"];
  const update_fields = Object.keys(req.body);

  const validOperation = update_fields.every((field) =>
    allowed_updates.includes(field)
  );

  if (!validOperation) {
    return res.status(400).send("Not authorised for this update operation");
  }

  try {
    // const task = await Task.findById(_id);
    const task = await Task.findOne({ _id, user: req.user._id });

    if (!task) {
      return res.status(404).send("Task Not Found");
    }

    update_fields.forEach((update) => {
      task[update] = req.body[update];
    });

    await task.save();

    res.status(200).send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

// ====================== Deleting the Task =======================

router.delete("/tasks/:id", isAuth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOneAndDelete({ _id, user: req.user._id });

    if (!task) {
      res.status(404).send(`User not found`);
    }
    res.status(200).send(`Data Deleted`);
  } catch (e) {
    res.status(500).send(e);
  }
});

// ==================================================================

module.exports = router;
