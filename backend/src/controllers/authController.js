import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger.js';

const signToken = (id) =>
  process.env.JWT_NO_EXPIRATION === 'true'
    ? jwt.sign({ id }, process.env.JWT_SECRET)
    : jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION || '7d'
      });

const SUPERADMIN_USERNAME = (process.env.SUPERADMIN_USERNAME || 'umair').trim().toLowerCase();
const SUPERADMIN_NAME = (process.env.SUPERADMIN_NAME || 'Umair').trim();
const SUPERADMIN_PASSWORD = process.env.SUPERADMIN_PASSWORD || 'Au_Q9090';

export const ensureSingleSuperadmin = async () => {
  const existing = await User.findOne({ username: SUPERADMIN_USERNAME }).select('+password');

  if (!existing) {
    await User.create({
      username: SUPERADMIN_USERNAME,
      name: SUPERADMIN_NAME,
      password: SUPERADMIN_PASSWORD,
      role: 'superadmin',
      isActive: true
    });
    logger.info(`Created single superadmin user: ${SUPERADMIN_USERNAME}`);
  } else {
    let changed = false;

    if (existing.role !== 'superadmin') {
      existing.role = 'superadmin';
      changed = true;
    }

    if (!existing.isActive) {
      existing.isActive = true;
      changed = true;
    }

    if (changed) {
      await existing.save({ validateBeforeSave: false });
      logger.info(`Normalized superadmin permissions for: ${SUPERADMIN_USERNAME}`);
    }
  }

  const result = await User.updateMany(
    { username: { $ne: SUPERADMIN_USERNAME }, isActive: true },
    { $set: { isActive: false } }
  );

  if (result.modifiedCount > 0) {
    logger.warn(`Deactivated ${result.modifiedCount} non-superadmin user account(s)`);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const normalizedUsername = String(username || '').trim().toLowerCase();

    if (normalizedUsername !== SUPERADMIN_USERNAME) {
      return res.status(401).json({
        success: false,
        error: 'Invalid username or password'
      });
    }

    const user = await User.findOne({ username: SUPERADMIN_USERNAME }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        error: 'Invalid username or password'
      });
    }

    if (!user.isActive || user.role !== 'superadmin') {
      return res.status(401).json({
        success: false,
        error: 'Account is not allowed to access this system'
      });
    }

    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    const token = signToken(user._id);
  logger.info(`Superadmin logged in: ${user.username}`);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update password
// @route   PUT /api/auth/password
// @access  Private
export const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        error: 'currentPassword and newPassword are required'
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        error: 'New password must be at least 8 characters'
      });
    }

    const user = await User.findById(req.user.id).select('+password');

    if (!user || user.username !== SUPERADMIN_USERNAME || user.role !== 'superadmin') {
      return res.status(403).json({
        success: false,
        error: 'Only the superadmin account can update password'
      });
    }

    if (!(await user.matchPassword(currentPassword))) {
      return res.status(401).json({
        success: false,
        error: 'Current password is incorrect'
      });
    }

    user.password = newPassword;
    await user.save();

    const token = signToken(user._id);
    logger.info(`Password updated for superadmin: ${user.username}`);

    res.status(200).json({
      success: true,
      message: 'Password updated successfully',
      token
    });
  } catch (error) {
    next(error);
  }
};
