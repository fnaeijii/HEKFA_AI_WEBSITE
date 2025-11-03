// src/controllers/caseStudyController.js
const CaseStudy = require('../models/CaseStudyModel');

// @desc    ایجاد یک مطالعه موردی جدید
// @route   POST /api/casestudies
// @access  Private (Admin)
const createCaseStudy = async (req, res) => {
  try {
    const { title, slug, client, description, technologies, results, imageUrl } = req.body;
    const caseStudyExists = await CaseStudy.findOne({ slug });
    if (caseStudyExists) {
      return res.status(400).json({ message: 'Case study with this slug already exists' });
    }
    const caseStudy = await CaseStudy.create({ title, slug, client, description, technologies, results, imageUrl });
    res.status(201).json(caseStudy);
  } catch (error) {
    res.status(400).json({ message: 'Error creating case study', error: error.message });
  }
};

// @desc    دریافت تمام مطالعات موردی
// @route   GET /api/casestudies
// @access  Public
const getAllCaseStudies = async (req, res) => {
  try {
    const caseStudies = await CaseStudy.find({}).sort({ createdAt: -1 });
    res.json(caseStudies);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    دریافت یک مطالعه موردی با slug
// @route   GET /api/casestudies/:slug
// @access  Public
const getCaseStudyBySlug = async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findOne({ slug: req.params.slug });
    if (!caseStudy) {
      return res.status(404).json({ message: 'Case study not found' });
    }
    res.json(caseStudy);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    ویرایش یک مطالعه موردی
// @route   PUT /api/casestudies/:slug
// @access  Private (Admin)
const updateCaseStudy = async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findOneAndUpdate({ slug: req.params.slug }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!caseStudy) {
      return res.status(404).json({ message: 'Case study not found' });
    }
    res.json(caseStudy);
  } catch (error) {
    res.status(400).json({ message: 'Error updating case study', error: error.message });
  }
};

// @desc    حذف یک مطالعه موردی
// @route   DELETE /api/casestudies/:slug
// @access  Private (Admin)
const deleteCaseStudy = async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findOneAndDelete({ slug: req.params.slug });
    if (!caseStudy) {
      return res.status(404).json({ message: 'Case study not found' });
    }
    res.json({ message: 'Case study removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  createCaseStudy,
  getAllCaseStudies,
  getCaseStudyBySlug,
  updateCaseStudy,
  deleteCaseStudy,
};