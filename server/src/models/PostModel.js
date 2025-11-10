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
    
    authors: [{ type: String }],
    journal: { type: String },
    publishedAt: { type: Date, default: Date.now },
    citations: { type: Number, default: 0 },
    downloadUrl: { type: String },          

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