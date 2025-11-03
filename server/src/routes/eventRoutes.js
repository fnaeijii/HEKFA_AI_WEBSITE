const express = require('express');
const router = express.Router();
const {
  createEvent,
  getActiveEvents,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');

// --- Public Route ---
// هر کسی می‌تواند لیست رویدادهای فعال را ببیند
router.route('/').get(getActiveEvents);

// --- Admin (Protected) Routes ---
// فقط ادمین می‌تواند رویدادها را مدیریت کند
router.route('/').post(protect, createEvent);

router.route('/:id')
  .put(protect, updateEvent)
  .delete(protect, deleteEvent);

module.exports = router;