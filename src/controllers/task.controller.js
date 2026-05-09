const { validationResult } = require("express-validator");

const Task = require("../models/task.model");
const User = require("../models/user.model");

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

    // Manager can assign to anyone
    if (req.user.role === "MANAGER" && assignedTo) {
      assignee = assignedTo;
    }

    // Team Lead can assign only to team members
    if (req.user.role === "TEAM_LEAD" && assignedTo) {
      const teamMember = await User.findOne({
        _id: assignedTo,
        teamLead: req.user._id,
      });

      if (!teamMember) {
        return res.status(403).json({
          success: false,
          message: "Can only assign to team members",
        });
      }

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

    // Team Lead sees:
    // - own tasks
    // - team member tasks
    else if (req.user.role === "TEAM_LEAD") {
      const teamMembers = await User.find({
        teamLead: req.user._id,
      }).select("_id");

      const memberIds = teamMembers.map((user) => user._id);

      filter = {
        $or: [
          { assignedTo: req.user._id },
          { assignedTo: { $in: memberIds } },
          { createdBy: req.user._id },
        ],
      };
    }

    // Employee
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

// ASSIGN TASK
const assignTask = async (req, res, next) => {
  try {
    const { assignedTo } = req.body;

    // Validate assignedTo
    if (!assignedTo) {
      return res.status(400).json({
        success: false,
        message: "assignedTo is required",
      });
    }

    // Find task
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // EMPLOYEE cannot assign
    if (req.user.role === "EMPLOYEE") {
      return res.status(403).json({
        success: false,
        message: "Employees cannot assign tasks",
      });
    }

    // MANAGER can assign to anyone
    if (req.user.role === "MANAGER") {
      const userExists = await User.findById(assignedTo);

      if (!userExists) {
        return res.status(404).json({
          success: false,
          message: "Assigned user not found",
        });
      }

      task.assignedTo = assignedTo;

      await task.save();

      return res.status(200).json({
        success: true,
        message: "Task assigned successfully",
        task,
      });
    }

    // TEAM LEAD logic
    if (req.user.role === "TEAM_LEAD") {
      // Allow self assignment
      if (assignedTo === req.user._id.toString()) {
        task.assignedTo = assignedTo;

        await task.save();

        return res.status(200).json({
          success: true,
          message: "Task assigned successfully",
          task,
        });
      }

      // Check if user is team member
      const teamMember = await User.findOne({
        _id: assignedTo,
        teamLead: req.user._id,
      });

      if (!teamMember) {
        return res.status(403).json({
          success: false,
          message: "Can only assign tasks to team members",
        });
      }

      task.assignedTo = assignedTo;

      await task.save();

      return res.status(200).json({
        success: true,
        message: "Task assigned successfully",
        task,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  assignTask,
};
