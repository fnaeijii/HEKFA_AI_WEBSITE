// src/models/ContentModel.js
const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  // 'key' یک شناسه منحصر به فرد برای هر قطعه محتوا است
  // مثال: 'about_page_title', 'home_hero_subtitle'
  key: {
    type: String,
    required: true,
    unique: true, // هر کلید باید یکتا باشد
    trim: true,
  },
  // 'value' محتوای واقعی است که می‌تواند متن طولانی یا HTML باشد
  value: {
    type: String,
    required: true,
  },
  // 'description' یک توضیح کوتاه برای ادمین است تا بداند این محتوا کجای سایت استفاده می‌شود
  description: {
    type: String,
  },
}, {
  timestamps: true,
});

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;