// src/models/CaseStudyModel.js
const mongoose = require('mongoose');

const caseStudySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: { // برای دسترسی راحت‌تر از طریق URL
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    client: { // نام مشتری
      type: String,
      required: true,
      trim: true,
    },
    description: { // شرح پروژه و چالش
      type: String,
      required: true,
    },
    technologies: [{ // تکنولوژی‌های استفاده شده
      type: String,
    }],
    results: [{ // نتایج کلیدی به صورت لیستی از رشته‌ها
      type: String,
    }],
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CaseStudy = mongoose.model('CaseStudy', caseStudySchema);

module.exports = CaseStudy;