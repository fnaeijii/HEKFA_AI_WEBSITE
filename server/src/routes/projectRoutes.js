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
const { protect } = require('../middleware/authMiddleware'); // Middleware را وارد کن

// --- Public Routes ---
router.route('/').get(getProjects);
router.route('/:slug').get(getProjectBySlug);

// --- Admin (Protected) Routes ---
router.route('/').post(protect, createProject); // <<-- قفل نصب شد
router.route('/:slug').put(protect, updateProject).delete(protect, deleteProject); // <<-- قفل نصب شد

module.exports = router;