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
  .post(protect, createTeamMember) 
  .get(getAllTeamMembers);         

router.route('/:id')
  .put(protect, updateTeamMember)  
  .delete(protect, deleteTeamMember);

module.exports = router;