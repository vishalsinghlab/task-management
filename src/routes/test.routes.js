const express = require("express");

const protect = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/protected", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Protected route accessed",
    user: req.user,
  });
});

module.exports = router;
