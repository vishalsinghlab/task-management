const { body } = require("express-validator");

const createTaskValidation = [
  body("title").trim().notEmpty().withMessage("Title is required"),

  body("description").trim().notEmpty().withMessage("Description is required"),

  body("status")
    .optional()
    .isIn(["PENDING", "IN_PROGRESS", "COMPLETED"])
    .withMessage("Invalid status"),
];

const updateTaskValidation = [
  body("title").optional().trim(),

  body("description").optional().trim(),

  body("status")
    .optional()
    .isIn(["PENDING", "IN_PROGRESS", "COMPLETED"])
    .withMessage("Invalid status"),
];

module.exports = {
  createTaskValidation,
  updateTaskValidation,
};
