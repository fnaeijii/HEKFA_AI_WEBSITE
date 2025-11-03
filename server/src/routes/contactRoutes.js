// src/routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const {
  createContactMessage,
  getAllContactMessages,
  getContactMessageById, // <<-- اینجا import کن
  deleteContactMessage,
  toggleMessageReadStatus,
} = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

// --- Public Route ---
router.route('/').post(createContactMessage);

// --- Admin (Protected) Routes ---
router.route('/').get(protect, getAllContactMessages);

// مسیرهای مربوط به یک ID خاص
router
  .route('/:id')
  .get(protect, getContactMessageById) // <<-- مسیر جدید را اینجا اضافه کن
  .delete(protect, deleteContactMessage);

router.route('/:id/read').put(protect, toggleMessageReadStatus);

module.exports = router;