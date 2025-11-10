// src/routes/postRoutes.js

const express = require('express');
const router = express.Router();
const {
  createPost,
  updatePost,
  deletePost,
  getAllPublishedPosts,
  getPostBySlug,
} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getAllPublishedPosts);
router.route('/:slug').get(getPostBySlug);

router.route('/').post(protect, createPost);

router
  .route('/:slug')
  .put(protect, updatePost)
  .delete(protect, deletePost);

module.exports = router;