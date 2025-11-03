// src/routes/contentRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllContent,
  getContentByKey,
  upsertContent,
} = require('../controllers/contentController');
const { protect } = require('../middleware/authMiddleware');

// ادمین می‌تواند لیست تمام محتواها را ببیند
router.route('/').get(protect, getAllContent);

// هر کسی می‌تواند محتوای یک کلید خاص را بخواند (برای نمایش در سایت)
// ادمین می‌تواند محتوای یک کلید خاص را ایجاد یا ویرایش کند
router.route('/:key')
  .get(getContentByKey)
  .put(protect, upsertContent);

module.exports = router;