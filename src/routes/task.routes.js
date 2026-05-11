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

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management APIs
 */

// All routes protected
router.use(protect);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a task
 *     description: Create a new task. Managers can assign to anyone, Team Leads can assign only to team members.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Complete dashboard UI
 *               description:
 *                 type: string
 *                 example: Finish dashboard before Friday
 *               status:
 *                 type: string
 *                 example: PENDING
 *               assignedTo:
 *                 type: string
 *                 example: 664f12ab45cd7890ef123456
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Access denied
 */
router.post("/", createTaskValidation, createTask);

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get tasks
 *     description: Get tasks based on logged in user role
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         required: false
 *         example: PENDING
 *     responses:
 *       200:
 *         description: Tasks fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 tasks:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 */
router.get("/", getTasks);

/**
 * @swagger
 * /api/tasks/{id}:
 *   patch:
 *     summary: Update task
 *     description: Update task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 664f12ab45cd7890ef123456
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 example: COMPLETED
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 *       403:
 *         description: Access denied
 */
router.patch("/:id", updateTaskValidation, updateTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete task
 *     description: Delete task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 664f12ab45cd7890ef123456
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *       403:
 *         description: Access denied
 */
router.delete("/:id", deleteTask);

/**
 * @swagger
 * /api/tasks/{id}/assign:
 *   patch:
 *     summary: Assign task
 *     description: Assign task to another user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 664f12ab45cd7890ef123456
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - assignedTo
 *             properties:
 *               assignedTo:
 *                 type: string
 *                 example: 664f12ab45cd7890ef654321
 *     responses:
 *       200:
 *         description: Task assigned successfully
 *       400:
 *         description: assignedTo is required
 *       403:
 *         description: Access denied
 *       404:
 *         description: Task or user not found
 */
router.patch("/:id/assign", assignTask);

module.exports = router;
