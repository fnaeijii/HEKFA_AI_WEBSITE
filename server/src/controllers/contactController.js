// src/controllers/contactController.js
const ContactMessage = require('../models/ContactModel');

// @desc    ایجاد یک پیام تماس جدید
// @route   POST /api/contact
// @access  Public
const createContactMessage = async (req, res) => {
  try {
    // داده‌ها را از بدنه درخواست (req.body) می‌خوانیم
    const { firstName, lastName, email, company, inquiryType, message } = req.body;

    // یک سند جدید بر اساس مدل ایجاد می‌کنیم
    const newMessage = await ContactMessage.create({
      firstName,
      lastName,
      email,
      company,
      inquiryType,
      message,
    });

    // در صورت موفقیت، یک پیام موفقیت‌آمیز برمی‌گردانیم
    res.status(201).json({ 
        message: 'Your message has been received successfully!',
        data: newMessage 
    });

  } catch (error) {
    // اگر ولیدیشن‌ها در مدل خطا بدهند، این بخش اجرا می‌شود
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation Error', errors: error.errors });
    }
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    دریافت تمام پیام‌های تماس
// @route   GET /api/contact
// @access  Private (Admin)
const getAllContactMessages = async (req, res) => {
  try {
    // پیام‌ها را از جدیدترین به قدیمی‌ترین مرتب می‌کنیم
    const messages = await ContactMessage.find({}).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    حذف یک پیام تماس
// @route   DELETE /api/contact/:id
// @access  Private (Admin)
const deleteContactMessage = async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);

    if (message) {
      await message.deleteOne();
      res.json({ message: 'Message removed' });
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    تغییر وضعیت پیام به خوانده شده/نشده
// @route   PUT /api/contact/:id/read
// @access  Private (Admin)
const toggleMessageReadStatus = async (req, res) => {
    try {
        const message = await ContactMessage.findById(req.params.id);

        if (message) {
            message.isRead = !message.isRead; // وضعیت را برعکس می‌کند
            const updatedMessage = await message.save();
            res.json(updatedMessage);
        } else {
            res.status(404).json({ message: 'Message not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

// src/controllers/contactController.js

// ... (توابع قبلی)

// @desc    دریافت یک پیام تماس با ID
// @route   GET /api/contact/:id
// @access  Private (Admin)
const getContactMessageById = async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);

    if (message) {
      res.json(message);
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  createContactMessage,
  getAllContactMessages,
  getContactMessageById, // <<-- تابع جدید را اینجا اضافه کن
  deleteContactMessage,
  toggleMessageReadStatus,
};