// src/models/projectModel.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // این فیلد اجباری است
      trim: true, // فاصله‌های اضافی ابتدا و انتها را حذف می‌کند
    },
    slug: {
      type: String,
      required: true,
      unique: true, // هر پروژه باید یک اسلاگ منحصر به فرد داشته باشد
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Production', 'Beta', 'Research', 'Completed'], // فقط این مقادیر مجاز هستند
      default: 'Production',
    },
    technologies: {
      type: [String], // آرایه‌ای از رشته‌ها
      default: [],
    },
    metrics: {
      type: Map, // از نوع Map استفاده می‌کنیم تا بتوانیم کلیدهای داینامیک داشته باشیم
      of: String,
    },
    icon: {
      type: String, // نام آیکون از lucide-react
    },
    mainImageUrl: {
      type: String,
    },
    // فیلدهای دیگر را می‌توان در آینده اضافه کرد
  },
  {
    timestamps: true, // به صورت خودکار فیلدهای createdAt و updatedAt را اضافه می‌کند
  }
);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;