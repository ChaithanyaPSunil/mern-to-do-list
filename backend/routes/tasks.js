// REST API routes for tasks — CRUD operations
const express = require("express");
const mongoose = require("mongoose");
const Task = require("../models/Task");

const router = express.Router();

// GET /api/tasks — fetch all tasks (newest first)
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/tasks — add a new task
router.post("/", async (req, res) => {
  try {
    // Convert to string and trim; reject empty titles
    const title = String(req.body.title ?? "").trim();
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const task = await Task.create({ title });
    res.status(201).json(task); // 201 = created
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/tasks/:id — update title and/or completed status
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updates = {};
    // If a title is sent, validate it the same way as POST
    if (req.body.title !== undefined) {
      const title = String(req.body.title).trim();
      if (!title) {
        return res.status(400).json({ message: "Title cannot be empty" });
      }
      updates.title = title;
    }
    // If completed is sent, store it as true/false
    if (req.body.completed !== undefined) {
      updates.completed = Boolean(req.body.completed);
    }

    const task = await Task.findByIdAndUpdate(id, updates, {
      returnDocument: "after", // return the updated task
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/tasks/:id — delete a task
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).json({ message: "Task not found" });
    }
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted", id });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;