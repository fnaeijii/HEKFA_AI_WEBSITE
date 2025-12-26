const express = require('express');
const router = express.Router();
const {
  getEnergyBlogs,
  getEnergyBlogBySlug,
  createEnergyBlog,
  updateEnergyBlog,
  deleteEnergyBlog,
} = require('../controllers/energyBlogController');
const { protect, optionalAuth } = require('../middleware/authMiddleware');

router
  .route('/')
  .get(optionalAuth, getEnergyBlogs)
  .post(protect, createEnergyBlog);

router
  .route('/:slug')
  .get(optionalAuth, getEnergyBlogBySlug)
  .put(protect, updateEnergyBlog)
  .delete(protect, deleteEnergyBlog);

module.exports = router;

