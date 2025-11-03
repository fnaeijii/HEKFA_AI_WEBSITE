// src/models/TeamMemberModel.js
const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true,
    },
    specialty: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      required: [true, 'Bio is required'],
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    linkedinUrl: { // فیلد جدید برای لینکدین
      type: String,
      trim: true,
    },
    order: { // برای مرتب‌سازی اعضای تیم در صفحه
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);

module.exports = TeamMember;