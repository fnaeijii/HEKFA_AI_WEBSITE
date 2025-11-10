// src/models/CaseStudyModel.js
const mongoose = require('mongoose');

const caseStudySchema = new mongoose.Schema(
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
      lowercase: true,
    },
    client: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    technologies: [{
      type: String,
    }],
    results: [{
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