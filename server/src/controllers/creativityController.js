const CreativityEntry = require('../models/CreativityModel');

// @desc    Get all creativity entries
// @route   GET /api/creativity
// @access  Public
const getCreativityEntries = async (req, res) => {
  try {
    const entries = await CreativityEntry.find({})
      .sort({ order: 1, createdAt: -1 })
      .lean();

    res.json(entries);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to load creativity entries', error: error.message });
  }
};

// @desc    Create creativity entry
// @route   POST /api/creativity
// @access  Private
const createCreativityEntry = async (req, res) => {
  try {
    const entry = await CreativityEntry.create(req.body);
    res.status(201).json(entry);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Failed to create creativity entry', error: error.message });
  }
};

// @desc    Update creativity entry
// @route   PUT /api/creativity/:id
// @access  Private
const updateCreativityEntry = async (req, res) => {
  try {
    const entry = await CreativityEntry.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: 'Creativity entry not found' });
    }

    Object.assign(entry, req.body);
    const updated = await entry.save();
    res.json(updated);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Failed to update creativity entry', error: error.message });
  }
};

// @desc    Delete creativity entry
// @route   DELETE /api/creativity/:id
// @access  Private
const deleteCreativityEntry = async (req, res) => {
  try {
    const entry = await CreativityEntry.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: 'Creativity entry not found' });
    }

    await entry.deleteOne();
    res.json({ message: 'Creativity entry removed' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to delete creativity entry', error: error.message });
  }
};

module.exports = {
  getCreativityEntries,
  createCreativityEntry,
  updateCreativityEntry,
  deleteCreativityEntry,
};

