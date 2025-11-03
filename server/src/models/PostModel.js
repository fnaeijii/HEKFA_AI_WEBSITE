// src/models/PostModel.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
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
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    mainImageUrl: {
      type: String,
    },
    // --- فیلدهای جدید برای بخش تحقیقات ---
    authors: [{ type: String }],             // <<-- این خط را اضافه کن
    journal: { type: String },                // <<-- این خط را اضافه کن
    publishedAt: { type: Date, default: Date.now }, // <<-- این خط را اضافه کن
    citations: { type: Number, default: 0 },  // <<-- این خط را اضافه کن
    downloadUrl: { type: String },            // <<-- این خط را اضافه کن
    // ------------------------------------

    category: {
      type: String,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // <<-- این خط مدل Post را به مدل User متصل می‌کند
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
  },
  {
    timestamps: true, // createdAt و updatedAt
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;