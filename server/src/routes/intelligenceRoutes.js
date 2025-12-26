// src/routes/intelligenceRoutes.js
const express = require('express');
const router = express.Router();
const {
  getIntelligenceItems,
  getIntelligenceBySlug,
  createIntelligence,
  updateIntelligence,
  deleteIntelligence
} = require('../controllers/intelligenceController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getIntelligenceItems)
  .post(protect, createIntelligence);

router.route('/:slug')
  .get(getIntelligenceBySlug)
  .put(protect, updateIntelligence)
  .delete(protect, deleteIntelligence);

module.exports = router;


