// src/models/projectModel.js
const mongoose = require('mongoose');

const CATEGORIES = [
  'NLP',
  'Computer Vision',
  'Computer Vision & AI',
  'Speech',
  'IoT',
  'Other'
];

const CTA_VARIANTS = ['default', 'outline', 'ghost'];

const slideshowImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  altText: { type: String },
  order: { type: Number }
}, { _id: false });

const projectInfoSchema = new mongoose.Schema({
  label: { type: String, required: true },
  labelFa: { type: String },
  value: { type: String, required: true },
  valueFa: { type: String },
  icon: { type: String }
}, { _id: false });

const heroButtonSchema = new mongoose.Schema({
  label: { type: String, required: true },
  labelFa: { type: String },
  href: { type: String, required: true },
  variant: { type: String, enum: CTA_VARIANTS, default: 'default' },
  icon: { type: String }
}, { _id: false });

const overviewDetailsSchema = new mongoose.Schema({
  description: { type: [String], default: [] },
  descriptionFa: { type: [String], default: [] },
  goals: { type: [String], default: [] },
  goalsFa: { type: [String], default: [] },
  challenge: { type: String },
  challengeFa: { type: String }
}, { _id: false });

const videoSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['youtube', 'vimeo', 'placeholder', 'upload'],
    default: 'placeholder'
  },
  url: { type: String },
  thumbnail: { type: String }
}, { _id: false });

const featureSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  titleFa: { type: String },
  description: { type: String, required: true },
  descriptionFa: { type: String }
}, { _id: false });

const architectureSchema = new mongoose.Schema({
  image: { type: String },
  description: { type: String },
  descriptionFa: { type: String }
}, { _id: false });

const challengeSchema = new mongoose.Schema({
  problem: { type: String, required: true },
  problemFa: { type: String },
  solution: { type: String, required: true },
  solutionFa: { type: String },
  icon: { type: String }
}, { _id: false });

const performanceItemSchema = new mongoose.Schema({
  label: { type: String, required: true },
  labelFa: { type: String },
  value: { type: String, required: true }
}, { _id: false });

const performanceSchema = new mongoose.Schema({
  before: { type: [performanceItemSchema], default: [] },
  after: { type: [performanceItemSchema], default: [] }
}, { _id: false });

const metricSchema = new mongoose.Schema({
  label: { type: String, required: true },
  labelFa: { type: String },
  value: { type: String, required: true },
  suffix: { type: String },
  icon: { type: String },
  color: { type: String }
}, { _id: false });

const useCaseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  titleFa: { type: String },
  description: { type: String, required: true },
  descriptionFa: { type: String },
  icon: { type: String },
  industry: { type: String },
  industryFa: { type: String }
}, { _id: false });

const testimonialSchema = new mongoose.Schema({
  quote: { type: String, required: true },
  quoteFa: { type: String },
  author: { type: String, required: true },
  role: { type: String, required: true },
  roleFa: { type: String },
  company: { type: String },
  companyFa: { type: String },
  avatar: { type: String }
}, { _id: false });

const ctaButtonSchema = new mongoose.Schema({
  label: { type: String, required: true },
  labelFa: { type: String },
  href: { type: String, required: true },
  variant: { type: String, enum: CTA_VARIANTS, default: 'default' },
  icon: { type: String }
}, { _id: false });

const ctaSectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  titleFa: { type: String },
  description: { type: String, required: true },
  descriptionFa: { type: String },
  buttons: { type: [ctaButtonSchema], default: [] }
}, { _id: false });

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    // نسخه فارسی عنوان (اختیاری) – ساختار داده را تغییر نمی‌دهد
    titleFa: {
      type: String,
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
      categoryIcon: {
        type: String,
        trim: true,
      },
    // توضیح کوتاه فارسی
    descriptionFa: {
      type: String,
      trim: true,
    },
    // --- فیلد جدید: توضیحات کامل برای بخش "Project Overview" ---
      overview: {
        type: String,
        required: true,
      },
      // نسخه فارسی Overview
      overviewFa: {
        type: String,
        trim: true,
      },
      overviewDetails: {
        type: overviewDetailsSchema,
        default: () => ({ description: [] }),
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
    
    heroButtons: {
      type: [heroButtonSchema],
      default: [],
    },
    projectInfo: {
      type: [projectInfoSchema],
      default: [],
    },
    video: {
      type: videoSchema,
      default: () => ({ type: 'placeholder' }),
    },
    features: {
      type: [featureSchema],
      default: [],
    },
    architecture: {
      type: architectureSchema,
    },
    challenges: {
      type: [challengeSchema],
      default: [],
    },
    performance: {
      type: performanceSchema,
    },
    results: {
      type: [metricSchema],
      default: [],
    },
    useCases: {
      type: [useCaseSchema],
      default: [],
    },
    testimonials: {
      type: [testimonialSchema],
      default: [],
    },
    ctaSection: {
      type: ctaSectionSchema,
    },
    mainImageUrl: {
      type: String, // برای بخش "System in Action"
    },
    slideshowImages: {
      type: [slideshowImageSchema],
      default: [],
    },

    // --- فیلدهای جدید اختیاری ---
    demoUrl: {
      type: String,
    },
    videoUrl: {
      type: String,
    },
    metrics: { type: mongoose.Schema.Types.Mixed },
    icon: { type: String },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;