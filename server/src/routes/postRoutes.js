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
const { protect } = require('../middleware/authMiddleware'); // <<-- وارد کردن قفل امنیتی

// --- Public Routes ---
// هر کسی می‌تواند لیست مقالات منتشر شده و یک مقاله خاص را ببیند
router.route('/').get(getAllPublishedPosts);
router.route('/:slug').get(getPostBySlug);


// --- Admin (Protected) Routes ---
// فقط ادمین احراز هویت شده می‌تواند مقالات را مدیریت کند

// ایجاد یک پست جدید
router.route('/').post(protect, createPost);

// ویرایش و حذف یک پست خاص
router
  .route('/:slug')
  .put(protect, updatePost)
  .delete(protect, deletePost);

module.exports = router;