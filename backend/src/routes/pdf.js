import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { generatePdfShareSchema } from '../middleware/validate.js';
import { generateSharePayload } from '../controllers/pdfController.js';

const router = express.Router();

router.use(authenticate);
router.post('/share-payload', generatePdfShareSchema, generateSharePayload);

export default router;
