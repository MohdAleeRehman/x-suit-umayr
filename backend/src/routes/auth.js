import express from 'express';
import { login, getMe, updatePassword } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import { loginSchema, updatePasswordSchema } from '../middleware/validate.js';

const router = express.Router();

router.post('/login', loginSchema, login);
router.get('/me', authenticate, getMe);
router.put('/password', authenticate, updatePasswordSchema, updatePassword);

export default router;
