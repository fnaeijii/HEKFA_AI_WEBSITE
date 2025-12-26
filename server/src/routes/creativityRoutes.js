const express = require('express');
const router = express.Router();
const {
  getCreativityEntries,
  createCreativityEntry,
  updateCreativityEntry,
  deleteCreativityEntry,
} = require('../controllers/creativityController');
const { protect } = require('../middleware/authMiddleware');

router
  .route('/')
  .get(getCreativityEntries)
  .post(protect, createCreativityEntry);

router
  .route('/:id')
  .put(protect, updateCreativityEntry)
  .delete(protect, deleteCreativityEntry);

module.exports = router;

