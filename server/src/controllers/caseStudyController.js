// src/controllers/caseStudyController.js
const CaseStudy = require('../models/CaseStudyModel');

// @desc    Create a new case study
// @route   POST /api/case-studies
// @access  Private (Admin)
const createCaseStudy = async (req, res) => {
  try {
    const {
      title, titleFa, slug, subtitle, subtitleFa, tags, client, clientFa, duration, industry,
      industryFa, description, descriptionFa, heroImage, imageUrl, sections, results, legacyResults,
      technologies, pdfUrl
    } = req.body;
    
    const caseStudyExists = await CaseStudy.findOne({ slug });
    if (caseStudyExists) {
      return res.status(400).json({ message: 'Case study with this slug already exists' });
    }
    
    const caseStudy = await CaseStudy.create({
      title,
      titleFa,
      slug,
      subtitle,
      subtitleFa,
      tags,
      client,
      clientFa,
      duration,
      industry,
      industryFa,
      description,
      descriptionFa,
      heroImage,
      imageUrl,
      sections,
      results,
      legacyResults,
      technologies,
      pdfUrl,
    });
    
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

// @desc    Update a case study
// @route   PUT /api/case-studies/:slug
// @access  Private (Admin)
const updateCaseStudy = async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findOne({ slug: req.params.slug });
    if (!caseStudy) {
      return res.status(404).json({ message: 'Case study not found' });
    }

    const {
      title, titleFa, slug, subtitle, subtitleFa, tags, client, clientFa, duration, industry,
      industryFa, description, descriptionFa, heroImage, imageUrl, sections, results, legacyResults,
      technologies, pdfUrl
    } = req.body;

    // Update fields
    if (title) caseStudy.title = title;
    if (titleFa) caseStudy.titleFa = titleFa;
    if (slug) caseStudy.slug = slug;
    if (subtitle) caseStudy.subtitle = subtitle;
    if (subtitleFa) caseStudy.subtitleFa = subtitleFa;
    if (tags) caseStudy.tags = tags;
    if (client) caseStudy.client = client;
    if (clientFa) caseStudy.clientFa = clientFa;
    if (duration) caseStudy.duration = duration;
    if (industry) caseStudy.industry = industry;
    if (industryFa) caseStudy.industryFa = industryFa;
    if (description) caseStudy.description = description;
    if (descriptionFa) caseStudy.descriptionFa = descriptionFa;
    if (heroImage !== undefined) caseStudy.heroImage = heroImage;
    if (imageUrl) caseStudy.imageUrl = imageUrl;
    if (sections) caseStudy.sections = sections;
    if (results) caseStudy.results = results;
    if (legacyResults) caseStudy.legacyResults = legacyResults;
    if (technologies) caseStudy.technologies = technologies;
    if (pdfUrl !== undefined) caseStudy.pdfUrl = pdfUrl;

    const updatedCaseStudy = await caseStudy.save();
    res.json(updatedCaseStudy);
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