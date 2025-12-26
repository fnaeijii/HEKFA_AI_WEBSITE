// src/controllers/intelligenceController.js
const Intelligence = require('../models/IntelligenceModel');

// @desc    Get all intelligence items
// @route   GET /api/intelligence
// @access  Public
const getIntelligenceItems = async (req, res) => {
  try {
    const filter = {};
    if (req.query.featured === 'true') {
      filter.isFeatured = true;
    }
    const items = await Intelligence.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get a single intelligence item by slug
// @route   GET /api/intelligence/:slug
// @access  Public
const getIntelligenceBySlug = async (req, res) => {
  try {
    const item = await Intelligence.findOne({ slug: req.params.slug });
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: 'Intelligence item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a new intelligence item
// @route   POST /api/intelligence
// @access  Private (Admin)
const createIntelligence = async (req, res) => {
  try {
    const {
      title, slug, subtitle, heroDescription, animationData, gradient,
      whatItIs, howItWorks, whyItMatters, comparison, useCases, cta,
      order, isFeatured
    } = req.body;

    const itemExists = await Intelligence.findOne({ slug });
    if (itemExists) {
      return res.status(400).json({ message: 'Intelligence item with this slug already exists' });
    }

    const item = await Intelligence.create({
      title, slug, subtitle, heroDescription, animationData, gradient,
      whatItIs, howItWorks, whyItMatters, comparison, useCases, cta,
      order, isFeatured
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: 'Error creating intelligence item', error: error.message });
  }
};

// @desc    Update an intelligence item
// @route   PUT /api/intelligence/:slug
// @access  Private (Admin)
const updateIntelligence = async (req, res) => {
  try {
    const item = await Intelligence.findOne({ slug: req.params.slug });

    if (item) {
      const {
        title, slug, subtitle, heroDescription, animationData, gradient,
        whatItIs, howItWorks, whyItMatters, comparison, useCases, cta,
        order, isFeatured
      } = req.body;

      if (title) item.title = title;
      if (slug) item.slug = slug;
      if (subtitle) item.subtitle = subtitle;
      if (heroDescription) item.heroDescription = heroDescription;
      if (animationData) item.animationData = animationData;
      if (gradient) item.gradient = gradient;
      if (whatItIs) item.whatItIs = whatItIs;
      if (howItWorks) item.howItWorks = howItWorks;
      if (whyItMatters) item.whyItMatters = whyItMatters;
      if (comparison) item.comparison = comparison;
      if (useCases) item.useCases = useCases;
      if (cta) item.cta = cta;
      if (order !== undefined) item.order = order;
      
      if (typeof isFeatured === 'boolean') {
        item.isFeatured = isFeatured;
      }

      const updatedItem = await item.save();
      res.json(updatedItem);
    } else {
      res.status(404).json({ message: 'Intelligence item not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating intelligence item', error: error.message });
  }
};

// @desc    Delete an intelligence item
// @route   DELETE /api/intelligence/:slug
// @access  Private (Admin)
const deleteIntelligence = async (req, res) => {
  try {
    const item = await Intelligence.findOne({ slug: req.params.slug });
    if (item) {
      await item.deleteOne();
      res.json({ message: 'Intelligence item removed' });
    } else {
      res.status(404).json({ message: 'Intelligence item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getIntelligenceItems,
  getIntelligenceBySlug,
  createIntelligence,
  updateIntelligence,
  deleteIntelligence
};


