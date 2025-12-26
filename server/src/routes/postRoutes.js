// src/routes/postRoutes.js

const express = require('express');
const router = express.Router();
const {
  createPost,
  updatePost,
  deletePost,
  getPosts,
  getPostsGroupedByCategory,
  getPostBySlug,
} = require('../controllers/postController');
const { protect, optionalAuth } = require('../middleware/authMiddleware');

router.route('/').get(optionalAuth, getPosts);
router.route('/grouped').get(getPostsGroupedByCategory);
router.route('/:slug').get(optionalAuth, getPostBySlug);

router.route('/').post(protect, createPost);

router
  .route('/:slug')
  .put(protect, updatePost)
  .delete(protect, deletePost);

module.exports = router;