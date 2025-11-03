const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadConfig'); // middleware که ساختیم را وارد می‌کنیم
const { protect } = require('../middleware/authMiddleware');

// @desc    آپلود یک فایل تصویر
// @route   POST /api/upload
// @access  Private (Admin)
router.post('/', protect, upload.single('image'), (req, res) => {
  // 'image' نام فیلدی است که از فرانت‌اند ارسال می‌شود

  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  // اگر آپلود موفقیت‌آمیز بود، یک URL عمومی برای دسترسی به فایل برمی‌گردانیم
  // این همان URLای است که باید در دیتابیس ذخیره شود
  res.status(200).json({
    message: 'File uploaded successfully',
    url: `/${req.file.path.replace(/\\/g, "/")}`, // مسیر فایل را به فرمت URL تبدیل می‌کنیم
  });
});

module.exports = router;