const express = require("express");

const protect = require("../middlewares/auth.middleware");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  assignTask,
} = require("../controllers/task.controller");

const {
  createTaskValidation,
  updateTaskValidation,
} = require("../validations/task.validation");

const router = express.Router();

// All routes protected
router.use(protect);

// Create task
router.post("/", createTaskValidation, createTask);

// Get tasks
router.get("/", getTasks);

// Update task
router.patch("/:id", updateTaskValidation, updateTask);

// Delete task
router.delete("/:id", deleteTask);

// Assign task
router.patch("/:id/assign", assignTask);

module.exports = router;
