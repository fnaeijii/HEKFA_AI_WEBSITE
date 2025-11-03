// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const protect = async (req, res, next) => {
  let token;

  // 1. چک کن که آیا هدر Authorization وجود دارد و با 'Bearer' شروع می‌شود
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // 2. توکن را از هدر استخراج کن ('Bearer TOKEN' -> 'TOKEN')
      token = req.headers.authorization.split(' ')[1];

      // 3. توکن را با کلید مخفی خودمان اعتبارسنجی کن
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. کاربر مربوط به این توکن را از دیتابیس پیدا کن (بدون پسورد)
      // و آن را به آبجکت req اضافه کن تا در مراحل بعدی در دسترس باشد
      req.user = await User.findById(decoded.id).select('-password');
      
      // 5. به مرحله بعد (controller) برو
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };