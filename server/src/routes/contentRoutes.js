// src/routes/contentRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllContent,
  getContentByKey,
  upsertContent,
} = require('../controllers/contentController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getAllContent);

router.route('/:key')
  .get(getContentByKey)
  .put(protect, upsertContent);

module.exports = router;