// src/routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const {
  createContactMessage,
  getAllContactMessages,
  getContactMessageById,
  deleteContactMessage,
  toggleMessageReadStatus,
} = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(createContactMessage);

router.route('/').get(protect, getAllContactMessages);

router
  .route('/:id')
  .get(protect, getContactMessageById)
  .delete(protect, deleteContactMessage);

router.route('/:id/read').put(protect, toggleMessageReadStatus);

module.exports = router;