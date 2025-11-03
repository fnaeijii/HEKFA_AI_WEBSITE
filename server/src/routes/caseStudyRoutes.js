// src/routes/caseStudyRoutes.js
const express = require('express');
const router = express.Router();
const {
  createCaseStudy,
  getAllCaseStudies,
  getCaseStudyBySlug,
  updateCaseStudy,
  deleteCaseStudy,
} = require('../controllers/caseStudyController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createCaseStudy)
  .get(getAllCaseStudies);

router.route('/:slug')
  .get(getCaseStudyBySlug)
  .put(protect, updateCaseStudy)
  .delete(protect, deleteCaseStudy);

module.exports = router;