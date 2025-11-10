const SiteConfig = require('../models/SiteConfigModel');

// @desc    دریافت تنظیمات سایت
// @route   GET /api/config
// @access  Public
const getConfig = async (req, res) => {
  try {
    let config = await SiteConfig.findOne({ configName: 'default' });
    if (!config) {
      config = await SiteConfig.create({ configName: 'default' });
    }
    res.json(config);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    به‌روزرسانی تنظیمات سایت
// @route   PUT /api/config
// @access  Private (Admin)
const updateConfig = async (req, res) => {
  try {
    const { researchStats, companyStats, contactInfo, globalOffices } = req.body;

    const config = await SiteConfig.findOneAndUpdate(
      { configName: 'default' },
      { researchStats, companyStats, contactInfo, globalOffices },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );
    
    res.json(config);
  } catch (error) {
    res.status(400).json({ message: 'Error updating config', error: error.message });
  }
};

module.exports = {
  getConfig,
  updateConfig,
};