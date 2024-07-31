const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["To do", "In progress", "Under review", "Completed"],
      default: "To-Do",
      required: true,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "Urgent"],
      default: "Medium",
    },
    deadline: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
