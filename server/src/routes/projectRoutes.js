// src/routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const { 
  getProjects, 
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getProjects)
  .post(protect, createProject);

// --- مسیرها را به این شکل تغییر می‌دهیم تا با فرانت‌اند هماهنگ شوند ---
router.route('/slug/:slug')
  .get(getProjectBySlug)
  .put(protect, updateProject)
  .delete(protect, deleteProject);

module.exports = router;