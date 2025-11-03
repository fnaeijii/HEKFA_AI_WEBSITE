// src/routes/teamMemberRoutes.js
const express = require('express');
const router = express.Router();
const {
  createTeamMember,
  getAllTeamMembers,
  updateTeamMember,
  deleteTeamMember,
} = require('../controllers/teamMemberController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createTeamMember) // ادمین ایجاد می‌کند
  .get(getAllTeamMembers);         // همه می‌بینند

router.route('/:id')
  .put(protect, updateTeamMember)   // ادمین ویرایش می‌کند
  .delete(protect, deleteTeamMember); // ادمین حذف می‌کند

module.exports = router;