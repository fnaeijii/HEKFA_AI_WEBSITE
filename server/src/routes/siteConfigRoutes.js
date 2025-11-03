const express = require('express');
const router = express.Router();
const { getConfig, updateConfig } = require('../controllers/siteConfigController');
const { protect } = require('../middleware/authMiddleware');

// --- Public Route ---
// هر کسی می‌تواند تنظیمات را برای نمایش در سایت دریافت کند
router.route('/').get(getConfig);

// --- Admin (Protected) Route ---
// فقط ادمین می‌تواند تنظیمات را ویرایش کند
router.route('/').put(protect, updateConfig);

module.exports = router;