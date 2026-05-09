const express = require("express");

const protect = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");

const {
  getAllUsers,
  getTeamMembers,
} = require("../controllers/user.controller");

const router = express.Router();

// Manager only
router.get("/", protect, authorize("MANAGER"), getAllUsers);

// Team Lead only
router.get("/team", protect, authorize("TEAM_LEAD"), getTeamMembers);

module.exports = router;
