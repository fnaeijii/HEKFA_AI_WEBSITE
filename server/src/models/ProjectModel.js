// src/models/projectModel.js
const mongoose = require('mongoose');

const CATEGORIES = [
  'NLP',
  'Computer Vision',
  'Speech',
  'IoT',
  'Other'
];

// --- زیر-اسکیما برای تکنولوژی‌ها ---
const technologySchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true } // می‌تواند ایموجی یا نام آیکون Lucide باشد
}, { _id: false }); // _id برای هر تکنولوژی لازم نیست

// --- زیر-اسکیما برای ویژگی‌های کلیدی ---
const keyFeatureSchema = new mongoose.Schema({
  icon: { type: String, required: true }, // نام آیکون Lucide
  title: { type: String, required: true },
  description: { type: String, required: true }
}, { _id: false }); // _id برای هر ویژگی کلیدی لازم نیست

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
      enum: CATEGORIES,
      default: 'Other',
    },
    // توضیحات کوتاه برای بخش Hero
    description: {
      type: String,
      required: true,
    },
    // --- فیلد جدید: توضیحات کامل برای بخش "Project Overview" ---
    overview: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Production', 'Beta', 'Research', 'Completed'],
      default: 'Production',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    
    // --- ساختار این فیلد تغییر کرد ---
    technologies: {
      type: [technologySchema],
      default: [],
    },

    // --- فیلد جدید: برای بخش "Key Features & Results" ---
    keyFeatures: {
      type: [keyFeatureSchema],
      default: [],
    },

    mainImageUrl: {
      type: String, // برای بخش "System in Action"
    },

    // --- فیلدهای جدید اختیاری ---
    demoUrl: {
      type: String, // لینک دموی زنده
    },
    videoUrl: {
      type: String, // لینک ویدیوی دمو
    },

    // این فیلدها حفظ شدند اما شاید دیگر لازم نباشند
    metrics: { type: mongoose.Schema.Types.Mixed },
    icon: { type: String },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;