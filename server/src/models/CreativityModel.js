const mongoose = require('mongoose');

const creativitySchema = new mongoose.Schema(
  {
    childName: {
      type: String,
      required: true,
      trim: true,
    },
    childNameFa: {
      type: String,
      trim: true,
    },
    idea: {
      type: String,
      required: true,
      trim: true,
    },
    ideaFa: {
      type: String,
      trim: true,
    },
    photo: {
      type: String,
    },
    position: {
      x: { type: Number, default: 50, min: 0, max: 100 },
      y: { type: Number, default: 50, min: 0, max: 100 },
    },
    rotation: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      default: 'bg-primary/10',
    },
    media: {
      type: {
        type: String,
        enum: ['image', 'video'],
      },
      url: { type: String },
    },
    order: {
      type: Number,
      default: 0,
    },
    highlight: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const CreativityEntry = mongoose.model('CreativityEntry', creativitySchema);

module.exports = CreativityEntry;

