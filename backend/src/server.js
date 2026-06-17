import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import connectDB from './db.js';
import recordRoutes from './routes/records.js';
import authRoutes from './routes/auth.js';
import pdfRoutes from './routes/pdf.js';
import { ensureSingleSuperadmin } from './controllers/authController.js';
import errorHandler from './middleware/errorHandler.js';
import { httpLogger } from './utils/logger.js';
import logger from './utils/logger.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Required for accurate client IP and rate-limiting behavior behind proxies (Render/Railway).
app.set('trust proxy', 1);

// ============================================
// MIDDLEWARE
// ============================================

// Security
app.use(helmet());

// Compression
app.use(compression());

// HTTP request logging
app.use(httpLogger);

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 min
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests, please try again later.' }
});
app.use('/api', limiter);

const loginLimiter = rateLimit({
  windowMs: parseInt(process.env.LOGIN_RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.LOGIN_RATE_LIMIT_MAX_REQUESTS) || 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many login attempts, please try again later.' }
});
app.use('/api/auth/login', loginLimiter);

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ============================================
// ROUTES
// ============================================

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'X Suite Backend is running ✅',
    timestamp: new Date().toISOString()
  });
});

// API version
app.get('/api/version', (req, res) => {
  res.status(200).json({
    success: true,
    version: '1.0.0',
    name: 'X Suite Backend API'
  });
});

// Auth endpoints
app.use('/api/auth', authRoutes);

// Records endpoints (protected)
app.use('/api/records', recordRoutes);

// PDF endpoints (protected)
app.use('/api/pdf', pdfRoutes);

// ============================================
// 404 HANDLER
// ============================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.path,
    method: req.method
  });
});

// ============================================
// ERROR HANDLER
// ============================================
app.use(errorHandler);

// ============================================
// START SERVER
// ============================================
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Ensure only one superadmin account exists
    await ensureSingleSuperadmin();

    // Start Express server
    app.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════╗
║                                        ║
║    🚀 X SUITE BACKEND API RUNNING     ║
║                                        ║
║    Port: ${PORT}                        ║
║    Environment: ${process.env.NODE_ENV || 'development'}         ║
║    MongoDB: ✅ Connected                ║
║                                        ║
║    Endpoints:                          ║
║    • GET  /api/health                 ║
║    • GET  /api/records                ║
║    • POST /api/records                ║
║    • PUT  /api/records/:id            ║
║    • DELETE /api/records/:id          ║
║                                        ║
╚════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    logger.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

// Handle unhandled rejections
process.on('unhandledRejection', (error) => {
  logger.error(`Unhandled Rejection: ${error.message}`);
  process.exit(1);
});

export { app, startServer };
export default app;
