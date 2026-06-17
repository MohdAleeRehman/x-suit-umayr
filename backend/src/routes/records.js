import express from 'express';
import {
  getRecords,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecord,
  permanentlyDeleteRecord,
  searchRecords
} from '../controllers/recordController.js';
import { authenticate } from '../middleware/auth.js';
import { createRecordSchema, updateRecordSchema } from '../middleware/validate.js';

const router = express.Router();

// All record routes require authentication
router.use(authenticate);

router.get('/', getRecords);
router.get('/search', searchRecords);
router.get('/:id', getRecord);
router.post('/', createRecordSchema, createRecord);
router.put('/:id', updateRecordSchema, updateRecord);
router.delete('/:id', deleteRecord);
router.delete('/:id/permanent', permanentlyDeleteRecord);

export default router;
