// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const extractUserFromToken = async (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return null;
  }

  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id).select('-password');
  return user;
};

const protect = async (req, res, next) => {
  try {
    const user = await extractUserFromToken(req);
    if (!user) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

const optionalAuth = async (req, res, next) => {
  try {
    const user = await extractUserFromToken(req);
    if (user) {
      req.user = user;
    }
  } catch (error) {
    console.error('optionalAuth token error:', error.message);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
  next();
};

module.exports = { protect, optionalAuth };