import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import logger from '../utils/logger.js';

// Protect routes - require valid JWT
export const authenticate = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized. No token provided.'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || !user.isActive || user.role !== 'superadmin') {
      return res.status(401).json({
        success: false,
        error: 'User not found, deactivated, or not authorized.'
      });
    }

    req.user = { id: user._id.toString(), username: user.username, role: user.role };
    next();
  } catch (error) {
    logger.warn(`Auth failure: ${error.message}`);
    return res.status(401).json({
      success: false,
      error: 'Not authorized. Invalid or expired token.'
    });
  }
};

// Optional auth - attach user if token present, continue if not
export const optionalAuth = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    req.user = user ? { id: user._id.toString(), username: user.username, role: user.role } : null;
  } catch {
    req.user = null;
  }

  next();
};

// Admin only
export const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'superadmin') {
    return res.status(403).json({
      success: false,
      error: 'Access denied. Superadmin only.'
    });
  }
  next();
};
