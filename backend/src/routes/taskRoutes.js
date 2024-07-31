const express = require("express");
const Task = require("../models/taskModel");
const authenticateUser = require("../middlewares/user");
const router = express.Router();

router.get("/tasks", authenticateUser, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/task/:id", authenticateUser, async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.find({ _id: taskId });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/tasks", authenticateUser, async (req, res) => {
  const { title, description, status, priority, deadline } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const newTask = new Task({
      user: req.user.id,
      title,
      description,
      status,
      priority,
      deadline,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
  }
});

router.post("/task/update/status/:id", authenticateUser, async (req, res) => {
  const _id = req.params.id;
  const { status } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      _id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found with this id" });
    }

    return res.status(200).json({ task: updatedTask });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});
router.post("/task/update/:id", authenticateUser, async (req, res) => {
  const _id = req.params.id;
  const { status, title, description, priority, deadline } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      _id,
      { status, title, description, priority, deadline },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found with this id" });
    }

    return res.status(200).json({updatedTask });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

router.delete("/task/delete/:id", authenticateUser, async (req, res) => {
  const taskId = req.params.id;

  try {
    // Find the task by ID
    const task = await Task.findById({ _id: taskId });

    // Check if the task exists
    if (!task) {
      return res.status(404).json({ message: "Task not found with this ID" });
    }

    // check if the user is the owner of the task
    // if (task.user.toString() !== req.user.id) {
    //   return res.status(403).json({ message: "Unauthorized action" });
    // }

    // Delete the task
    await Task.findByIdAndDelete({ _id: taskId });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
