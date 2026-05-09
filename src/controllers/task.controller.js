const { validationResult } = require("express-validator");

const Task = require("../models/task.model");

// CREATE TASK
const createTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { title, description, status, assignedTo } = req.body;

    let assignee = req.user._id;

    // Manager or Team Lead can assign
    if (["MANAGER", "TEAM_LEAD"].includes(req.user.role) && assignedTo) {
      assignee = assignedTo;
    }

    const task = await Task.create({
      title,
      description,
      status,
      createdBy: req.user._id,
      assignedTo: assignee,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    next(error);
  }
};

// GET TASKS
const getTasks = async (req, res, next) => {
  try {
    let filter = {};

    // Manager sees all tasks
    if (req.user.role === "MANAGER") {
      filter = {};
    }

    // Team Lead sees assigned + created
    else if (req.user.role === "TEAM_LEAD") {
      filter = {
        $or: [{ assignedTo: req.user._id }, { createdBy: req.user._id }],
      };
    }

    // Employee sees own tasks only
    else {
      filter = {
        assignedTo: req.user._id,
      };
    }

    // Status filter
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const tasks = await Task.find(filter)
      .populate("assignedTo", "username email role")
      .populate("createdBy", "username email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE TASK
const updateTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Employee can only edit own tasks
    if (
      req.user.role === "EMPLOYEE" &&
      task.assignedTo.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    // Update task
    Object.assign(task, req.body);

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE TASK
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Employee restriction
    if (
      req.user.role === "EMPLOYEE" &&
      task.assignedTo.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
