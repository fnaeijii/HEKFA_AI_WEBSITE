// src/controllers/teamMemberController.js
const TeamMember = require('../models/TeamMemberModel');

// @desc    ایجاد یک عضو تیم جدید
// @route   POST /api/team
// @access  Private (Admin)
const createTeamMember = async (req, res) => {
  try {
    const { name, role, specialty, bio, imageUrl, linkedinUrl, order } = req.body;
    const member = await TeamMember.create({ name, role, specialty, bio, imageUrl, linkedinUrl, order });
    res.status(201).json(member);
  } catch (error) {
    res.status(400).json({ message: 'Error creating team member', error: error.message });
  }
};

// @desc    دریافت تمام اعضای تیم
// @route   GET /api/team
// @access  Public
const getAllTeamMembers = async (req, res) => {
  try {
    const members = await TeamMember.find({}).sort({ order: 1 }); // مرتب‌سازی بر اساس فیلد order
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    ویرایش یک عضو تیم
// @route   PUT /api/team/:id
// @access  Private (Admin)
const updateTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    res.json(member);
  } catch (error) {
    res.status(400).json({ message: 'Error updating team member', error: error.message });
  }
};

// @desc    حذف یک عضو تیم
// @route   DELETE /api/team/:id
// @access  Private (Admin)
const deleteTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    res.json({ message: 'Team member removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  createTeamMember,
  getAllTeamMembers,
  updateTeamMember,
  deleteTeamMember,
};