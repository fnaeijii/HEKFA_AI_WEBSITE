// src/models/projectModel.js
const mongoose = require('mongoose');

const CATEGORIES = [
  'NLP', 
  'Computer Vision', 
  'Data Analysis', 
  'Robotics', 
  'Other'
];

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
    category: {
      type: String,
      required: true,
      enum: CATEGORIES, // <<-- استفاده از enu
      default: 'Other',
      },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Production', 'Beta', 'Research', 'Completed'], // فقط این مقادیر مجاز هستند
      default: 'Production',
    },
    
    isFeatured: { // <<-- این فیلد را اضافه کن
      type: Boolean,
      default: false,
    },
    metrics: { type: mongoose.Schema.Types.Mixed }, // <<-- این خط را اضافه کن (برای انعطاف‌پذیری)
    technologies: {
      type: [String], // آرایه‌ای از رشته‌ها
      default: [],
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