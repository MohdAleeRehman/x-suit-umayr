import Record from '../models/Record.js';
import logger from '../utils/logger.js';

// @desc    Get all records for user
// @route   GET /api/records
// @access  Private
export const getRecords = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { type, skip = 0, limit = 20, archived = false } = req.query;

    // Build filter
    const filter = { userId, archived: archived === 'true' };
    if (type) {
      filter.type = type;
    }

    // Get total count
    const total = await Record.countDocuments(filter);

    // Get records with pagination
    const records = await Record.find(filter)
      .sort({ createdAt: -1 })
      .skip(parseInt(skip))
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: records.length,
      total,
      skip: parseInt(skip),
      limit: parseInt(limit),
      data: records
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single record
// @route   GET /api/records/:id
// @access  Private
export const getRecord = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const record = await Record.findOne({ _id: id, userId });

    if (!record) {
      return res.status(404).json({
        success: false,
        error: 'Record not found'
      });
    }

    res.status(200).json({
      success: true,
      data: record
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid record ID'
      });
    }
    next(error);
  }
};

// @desc    Create new record
// @route   POST /api/records
// @access  Private
export const createRecord = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { type, dataset, tags = [] } = req.body;

    // Validation
    if (!type || !dataset) {
      return res.status(400).json({
        success: false,
        error: 'Type and dataset are required'
      });
    }

    if (!['sale', 'rent', 'property'].includes(type)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid record type. Must be: sale, rent, or property'
      });
    }

    // Create record
    const record = new Record({
      userId,
      type,
      dataset,
      tags
    });

    await record.save();

    res.status(201).json({
      success: true,
      message: 'Record created successfully',
      data: record
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update record
// @route   PUT /api/records/:id
// @access  Private
export const updateRecord = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { dataset, tags } = req.body;

    if (!dataset) {
      return res.status(400).json({
        success: false,
        error: 'Dataset is required for update'
      });
    }

    // Find and update record (only user's own records)
    const record = await Record.findOne({ _id: id, userId });

    if (!record) {
      return res.status(404).json({
        success: false,
        error: 'Record not found'
      });
    }

    // Update fields
    record.dataset = dataset;
    if (tags) {
      record.tags = tags;
    }

    // Auto-update title based on dataset
    if (record.type === 'sale' && dataset.sellPrice) {
      record.title = `Sale: AED ${dataset.sellPrice.toLocaleString('en-US')}`;
    } else if (record.type === 'rent' && dataset.rentAnnual) {
      record.title = `Rent: AED ${dataset.rentAnnual.toLocaleString('en-US')}/year`;
    } else if (record.type === 'property' && dataset.pPrice) {
      record.title = `Property: AED ${dataset.pPrice.toLocaleString('en-US')}`;
    }

    await record.save();

    res.status(200).json({
      success: true,
      message: 'Record updated successfully',
      data: record
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid record ID'
      });
    }
    next(error);
  }
};

// @desc    Delete record (soft delete)
// @route   DELETE /api/records/:id
// @access  Private
export const deleteRecord = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const record = await Record.findOne({ _id: id, userId });

    if (!record) {
      return res.status(404).json({
        success: false,
        error: 'Record not found'
      });
    }

    // Soft delete
    record.archived = true;
    record.deletedAt = new Date();
    await record.save();

    res.status(200).json({
      success: true,
      message: 'Record deleted successfully (can be recovered within 30 days)'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid record ID'
      });
    }
    next(error);
  }
};

// @desc    Permanently delete record
// @route   DELETE /api/records/:id/permanent
// @access  Private
export const permanentlyDeleteRecord = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const record = await Record.findOneAndRemove({ _id: id, userId });

    if (!record) {
      return res.status(404).json({
        success: false,
        error: 'Record not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Record permanently deleted'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Search records
// @route   GET /api/records/search?q=villa
// @access  Private
export const searchRecords = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { q, type } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Search query required'
      });
    }

    const filter = {
      userId,
      archived: false,
      $text: { $search: q }
    };

    if (type) {
      filter.type = type;
    }

    const records = await Record.find(filter, { score: { $meta: 'textScore' } })
      .sort({ score: { $meta: 'textScore' } })
      .limit(20);

    res.status(200).json({
      success: true,
      count: records.length,
      data: records
    });
  } catch (error) {
    next(error);
  }
};
