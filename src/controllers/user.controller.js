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

const assignTeamLead = async (req, res, next) => {
  try {
    const { teamLeadId } = req.body;

    const employee = await User.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const teamLead = await User.findOne({
      _id: teamLeadId,
      role: "TEAM_LEAD",
    });

    if (!teamLead) {
      return res.status(404).json({
        success: false,
        message: "Team Lead not found",
      });
    }

    employee.teamLead = teamLeadId;

    await employee.save();

    res.status(200).json({
      success: true,
      message: "Team Lead assigned successfully",
      user: employee,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getTeamMembers,
  assignTeamLead,
};
