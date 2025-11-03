// src/models/contactModel.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      // یک ولیدیشن ساده برای فرمت ایمیل
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    },
    company: {
      type: String,
      trim: true,
    },
    inquiryType: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
    },
    isRead: { // این فیلد در فاز دوم برای پنل ادمین مفید خواهد بود
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // زمان دریافت پیام را ثبت می‌کند
  }
);

const ContactMessage = mongoose.model('ContactMessage', contactSchema);

module.exports = ContactMessage;