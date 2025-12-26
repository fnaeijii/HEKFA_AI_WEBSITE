// src/models/CaseStudyModel.js
const mongoose = require('mongoose');

// Sub-schema for case study sections
const caseStudySectionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true }, // Rich content as markdown or HTML
  // نسخه فارسی عنوان و محتوا (اختیاری)
  titleFa: { type: String },
  contentFa: { type: String },
}, { _id: false });

// Sub-schema for results with metrics
const resultSchema = new mongoose.Schema({
  metric: { type: String, required: true },
  value: { type: String, required: true },
  description: { type: String, required: true },
  metricFa: { type: String },
  valueFa: { type: String },
  descriptionFa: { type: String },
}, { _id: false });

const caseStudySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    titleFa: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    subtitle: {
      type: String,
      required: true,
      trim: true,
    },
    subtitleFa: {
      type: String,
      trim: true,
    },
    tags: [{
      type: String,
      trim: true,
    }],
    client: {
      type: String,
      required: true,
      trim: true,
    },
    clientFa: {
      type: String,
      trim: true,
    },
    duration: {
      type: String,
      trim: true,
    },
    industry: {
      type: String,
      trim: true,
    },
    industryFa: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    descriptionFa: {
      type: String,
    },
    heroImage: {
      type: String, // Optional hero image URL
    },
    imageUrl: {
      type: String,
      required: true,
    },
    sections: [caseStudySectionSchema],
    results: [resultSchema], // New structured results format
    legacyResults: [{ type: String }], // Keep old format for backward compatibility
    technologies: [{
      type: String,
    }],
    pdfUrl: {
      type: String, // Optional PDF download URL
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
caseStudySchema.index({ slug: 1 });

const CaseStudy = mongoose.model('CaseStudy', caseStudySchema);

module.exports = CaseStudy;