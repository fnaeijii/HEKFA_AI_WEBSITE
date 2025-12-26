// src/models/TeamMemberModel.js
const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    nameFa: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true,
    },
    roleFa: {
      type: String,
      trim: true,
    },
    specialty: {
      type: String,
      trim: true,
    },
    specialtyFa: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      required: [true, 'Bio is required'],
    },
    bioFa: {
      type: String,
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    linkedinUrl: {
      type: String,
      trim: true,
    },
    order: {
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