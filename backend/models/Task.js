// Task model — defines the shape of a task stored in MongoDB
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true }, // task text (required)
  completed: { type: Boolean, default: false },        // done or not
  createdAt: { type: Date, default: Date.now },        // auto-set when created
});

module.exports = mongoose.model("Task", taskSchema);