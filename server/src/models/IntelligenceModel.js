// src/models/IntelligenceModel.js
const mongoose = require('mongoose');

// Sub-schema for comparison table rows
const comparisonRowSchema = new mongoose.Schema({
  feature: { type: String, required: true },
  traditional: { type: String, required: true },
  withAI: { type: String, required: true },
  featureFa: { type: String },
  traditionalFa: { type: String },
  withAIFa: { type: String },
}, { _id: false });

// Sub-schema for use cases
const useCaseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true }, // Lucide icon name
  titleFa: { type: String },
  descriptionFa: { type: String },
}, { _id: false });

// Sub-schema for CTA (Call to Action)
const ctaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  buttonText: { type: String, required: true },
  buttonLink: { type: String, required: true },
  titleFa: { type: String },
  descriptionFa: { type: String },
  buttonTextFa: { type: String },
}, { _id: false });

const intelligenceSchema = new mongoose.Schema(
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
    // Hero section
    heroDescription: {
      type: String,
      required: true,
    },
    heroDescriptionFa: {
      type: String,
    },
    animationData: {
      type: String, // Path to Lottie animation JSON file
    },
    gradient: {
      type: String, // Tailwind gradient classes (e.g., "from-blue-500 to-cyan-500")
    },
    
    // Content sections
    whatItIs: {
      title: { type: String, required: true },
      content: { type: String, required: true },
      titleFa: { type: String },
      contentFa: { type: String },
    },
    howItWorks: {
      title: { type: String, required: true },
      content: { type: String, required: true },
      steps: [{
        number: { type: Number, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        titleFa: { type: String },
        descriptionFa: { type: String },
      }],
    },
    whyItMatters: {
      title: { type: String, required: true },
      content: { type: String, required: true },
      benefits: [{
        icon: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        titleFa: { type: String },
        descriptionFa: { type: String },
      }],
    },
    
    // Comparison table
    comparison: {
      title: { type: String, required: true },
      subtitle: { type: String },
      rows: [comparisonRowSchema],
      titleFa: { type: String },
      subtitleFa: { type: String },
    },
    
    // Use cases
    useCases: {
      title: { type: String, required: true },
      subtitle: { type: String },
      cases: [useCaseSchema],
      titleFa: { type: String },
      subtitleFa: { type: String },
    },
    
    // Call to Action
    cta: ctaSchema,
    
    // Order for display on home page
    order: {
      type: Number,
      default: 0,
    },
    
    // Whether to show on home page
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
intelligenceSchema.index({ slug: 1 });
intelligenceSchema.index({ isFeatured: 1, order: 1 });

const Intelligence = mongoose.model('Intelligence', intelligenceSchema);

module.exports = Intelligence;


