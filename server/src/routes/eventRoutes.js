const express = require('express');
const router = express.Router();
const {
  createEvent,
  getActiveEvents,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getActiveEvents);

router.route('/').post(protect, createEvent);

router.route('/:id')
  .put(protect, updateEvent)
  .delete(protect, deleteEvent);

module.exports = router;