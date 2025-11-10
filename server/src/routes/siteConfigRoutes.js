const express = require('express');
const router = express.Router();
const { getConfig, updateConfig } = require('../controllers/siteConfigController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getConfig);

router.route('/').put(protect, updateConfig);

module.exports = router;