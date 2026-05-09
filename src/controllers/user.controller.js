const User = require("../models/user.model");

// Manager -> all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    next(error);
  }
};

// Team Lead -> team members
const getTeamMembers = async (req, res, next) => {
  try {
    const users = await User.find({
      teamLead: req.user._id,
    }).select("-password");

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getTeamMembers,
};
