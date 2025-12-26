const mongoose = require('mongoose');

const energyBlogSchema = new mongoose.Schema(
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
      trim: true,
    },
    excerpt: {
      type: String,
      trim: true,
    },
    excerptFa: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    contentFa: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: 'Leaf',
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'published',
    },
    order: {
      type: Number,
      default: 0,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
    meta: {
      featured: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

const EnergyBlog = mongoose.model('EnergyBlog', energyBlogSchema);

module.exports = EnergyBlog;

