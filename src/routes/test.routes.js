const express = require("express");

const protect = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");

const router = express.Router();

// Any authenticated user
router.get("/protected", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Protected route accessed",
    user: req.user,
  });
});

// Manager only
router.get("/manager", protect, authorize("MANAGER"), (req, res) => {
  res.status(200).json({
    success: true,
    message: "Manager route accessed",
  });
});

// Manager + Team Lead
router.get(
  "/lead-or-manager",
  protect,
  authorize("MANAGER", "TEAM_LEAD"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Lead or Manager route accessed",
    });
  },
);

module.exports = router;
