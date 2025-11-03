// src/controllers/contentController.js
const Content = require('../models/ContentModel');

// @desc    دریافت تمام قطعات محتوا (برای پنل ادمین)
// @route   GET /api/content
// @access  Private (Admin)
const getAllContent = async (req, res) => {
  try {
    const contents = await Content.find({});
    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    دریافت یک قطعه محتوا با کلید آن (برای فرانت‌اند عمومی)
// @route   GET /api/content/:key
// @access  Public
const getContentByKey = async (req, res) => {
  try {
    const content = await Content.findOne({ key: req.params.key });
    if (content) {
      res.json(content);
    } else {
      res.status(404).json({ message: 'Content for this key not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    ایجاد یا به‌روزرسانی یک قطعه محتوا (Upsert)
// @route   PUT /api/content/:key
// @access  Private (Admin)
const upsertContent = async (req, res) => {
  try {
    const { key } = req.params;
    const { value, description } = req.body;

    // گزینه‌ی upsert: if the record exists, update it. if not, create it.
    const options = {
      new: true, // برگرداندن سند جدید/آپدیت شده
      upsert: true, // مهم‌ترین بخش: اگر پیدا نشد، ایجاد کن
      runValidators: true,
    };

    const content = await Content.findOneAndUpdate(
      { key },
      { value, description },
      options
    );

    res.json(content);
  } catch (error) {
    res.status(400).json({ message: 'Error upserting content', error: error.message });
  }
};


module.exports = {
  getAllContent,
  getContentByKey,
  upsertContent,
};