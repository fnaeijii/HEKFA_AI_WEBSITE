const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadConfig'); // middleware که ساختیم را وارد می‌کنیم
const { protect } = require('../middleware/authMiddleware');

// @desc    آپلود یک فایل تصویر
// @route   POST /api/upload
// @access  Private (Admin)
router.post('/', protect, upload.single('image'), (req, res) => {

  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  res.status(200).json({
    message: 'File uploaded successfully',
    url: `/${req.file.path.replace(/\\/g, "/")}`,
  });
});

module.exports = router;