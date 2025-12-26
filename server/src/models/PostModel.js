// src/models/PostModel.js
const mongoose = require('mongoose');

const subsectionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String },
  },
  { _id: false }
);

const sectionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    subsections: {
      type: [subsectionSchema],
      default: [],
    },
  },
  { _id: false }
);

const MAIN_CATEGORIES = ['Computer Vision', 'NLP', 'Generative AI', 'Robotics'];

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    // نسخه فارسی عنوان
    titleFa: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    summary: {
      type: String,
      required: [true, 'Summary is required'],
    },
    summaryFa: {
      type: String,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    contentFa: {
      type: String,
    },
    mainImageUrl: {
      type: String,
    },
    // Optional hero image for featured layouts
    heroImage: {
      type: String,
    },
    // Optional cover/poster image for carousels (e.g. /research coverflow)
    coverImage: {
      type: String,
    },
    pdfUrl: {
      type: String,
    },
    doi: {
      type: String,
      trim: true,
    },
    readTimeMinutes: {
      type: Number,
      default: 8,
    },
    authors: [{ type: String }],
    journal: { type: String },
    publishedAt: { type: Date, default: Date.now },
    citations: { type: Number, default: 0 },
    downloadUrl: { type: String },
    category: {
      type: String,
      required: true,
      enum: MAIN_CATEGORIES,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    sections: {
      type: [sectionSchema],
      default: [],
    },
    references: {
      type: [String],
      default: [],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;