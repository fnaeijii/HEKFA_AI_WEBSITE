const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
    },
    titleFa: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Event date is required'],
    },
    location: {
      type: String,
      required: [true, 'Event location is required'],
      trim: true,
    },
    locationFa: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'A short description is required'],
    },
    descriptionFa: {
      type: String,
    },
    boothNumber: {
        type: String,
        trim: true,
    },
    registrationUrl: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
    },
    isActive: {
        type: Boolean,
        default: true,
    }
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;