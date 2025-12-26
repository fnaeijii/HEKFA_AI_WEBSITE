const EnergyBlog = require('../models/EnergyBlogModel');

const slugify = (value = '') =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

// @desc    Get all published energy blog entries
// @route   GET /api/energy-blogs
// @access  Public
const getEnergyBlogs = async (req, res) => {
  try {
    const includeDrafts = req.query.all === 'true' && req.user?.isAdmin;
    const filter = includeDrafts ? {} : { status: 'published' };

    const entries = await EnergyBlog.find(filter)
      .sort({ order: 1, createdAt: -1 })
      .lean();

    res.json(entries);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to load energy blog entries', error: error.message });
  }
};

// @desc    Get single energy blog entry by slug
// @route   GET /api/energy-blogs/:slug
// @access  Public
const getEnergyBlogBySlug = async (req, res) => {
  try {
    const filter = { slug: req.params.slug };
    const canPreview = req.query.preview === 'true' && req.user?.isAdmin;
    if (!canPreview) {
      filter.status = 'published';
    }

    const entry = await EnergyBlog.findOne(filter);
    if (!entry) {
      return res.status(404).json({ message: 'Energy blog entry not found' });
    }

    res.json(entry);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to load energy blog entry', error: error.message });
  }
};

// @desc    Create new energy blog entry
// @route   POST /api/energy-blogs
// @access  Private
const createEnergyBlog = async (req, res) => {
  try {
    const {
      title,
      titleFa,
      slug,
      content,
      contentFa,
      excerpt,
      excerptFa,
      image,
      icon,
      status,
      order,
    } = req.body;

    if (!title || !content || !image) {
      return res.status(400).json({ message: 'Title, content and image are required' });
    }

    const normalizedSlug = slug ? slugify(slug) : slugify(title);
    if (!normalizedSlug) {
      return res.status(400).json({ message: 'Unable to derive slug from title' });
    }

    const entryExists = await EnergyBlog.findOne({ slug: normalizedSlug });
    if (entryExists) {
      return res.status(400).json({ message: 'Energy blog entry with this slug already exists' });
    }

    const entry = await EnergyBlog.create({
      title,
      titleFa,
      slug: normalizedSlug,
      content,
      contentFa,
      excerpt,
      excerptFa,
      image,
      icon,
      status,
      order,
    });

    res.status(201).json(entry);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Failed to create energy blog entry', error: error.message });
  }
};

// @desc    Update energy blog entry
// @route   PUT /api/energy-blogs/:slug
// @access  Private
const updateEnergyBlog = async (req, res) => {
  try {
    const entry = await EnergyBlog.findOne({ slug: req.params.slug });
    if (!entry) {
      return res.status(404).json({ message: 'Energy blog entry not found' });
    }

    const updates = { ...req.body };

    if (updates.slug || updates.title) {
      const nextSlug = slugify(updates.slug || updates.title);
      if (!nextSlug) {
        return res.status(400).json({ message: 'Slug cannot be empty' });
      }
      updates.slug = nextSlug;
    }

    Object.assign(entry, updates);
    const updated = await entry.save();
    res.json(updated);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Failed to update energy blog entry', error: error.message });
  }
};

// @desc    Delete energy blog entry
// @route   DELETE /api/energy-blogs/:slug
// @access  Private
const deleteEnergyBlog = async (req, res) => {
  try {
    const entry = await EnergyBlog.findOne({ slug: req.params.slug });
    if (!entry) {
      return res.status(404).json({ message: 'Energy blog entry not found' });
    }

    await entry.deleteOne();
    res.json({ message: 'Energy blog entry removed' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to delete energy blog entry', error: error.message });
  }
};

module.exports = {
  getEnergyBlogs,
  getEnergyBlogBySlug,
  createEnergyBlog,
  updateEnergyBlog,
  deleteEnergyBlog,
};

