// src/controllers/authController.js
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

// تابع برای ساخت توکن
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // توکن تا ۳۰ روز معتبر است
  });
};

// @desc    احراز هویت ادمین و دریافت توکن
// @route   POST /api/auth/login
// @access  Public
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // پیدا کردن کاربر با ایمیل
    const user = await User.findOne({ email });

    // چک کردن وجود کاربر و تطابق پسورد
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  loginAdmin,
};