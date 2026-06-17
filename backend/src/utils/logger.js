import { createWriteStream, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const LOG_DIR = join(__dirname, '../../logs');

// Ensure logs directory exists
try { mkdirSync(LOG_DIR, { recursive: true }); } catch {}

const LOG_FILE = join(LOG_DIR, 'app.log');
const ERROR_FILE = join(LOG_DIR, 'error.log');

const logStream = createWriteStream(LOG_FILE, { flags: 'a' });
const errorStream = createWriteStream(ERROR_FILE, { flags: 'a' });

const LEVELS = { error: 0, warn: 1, info: 2, http: 3, debug: 4 };
const COLORS = { error: '\x1b[31m', warn: '\x1b[33m', info: '\x1b[32m', http: '\x1b[36m', debug: '\x1b[35m' };
const RESET = '\x1b[0m';

const isDev = process.env.NODE_ENV !== 'production';

function log(level, message, meta = null) {
  const timestamp = new Date().toISOString();
  const metaStr = meta ? ` ${JSON.stringify(meta)}` : '';
  const line = `[${timestamp}] [${level.toUpperCase()}] ${message}${metaStr}\n`;

  // Write to file
  logStream.write(line);
  if (level === 'error') errorStream.write(line);

  // Console output with color in dev
  if (isDev) {
    const color = COLORS[level] || '';
    process.stdout.write(`${color}${line}${RESET}`);
  } else if (LEVELS[level] <= LEVELS.warn) {
    process.stdout.write(line);
  }
}

const logger = {
  error: (msg, meta) => log('error', msg, meta),
  warn: (msg, meta) => log('warn', msg, meta),
  info: (msg, meta) => log('info', msg, meta),
  http: (msg, meta) => log('http', msg, meta),
  debug: (msg, meta) => log('debug', msg, meta)
};

// Express HTTP request logger middleware
export const httpLogger = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.http(`${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`, {
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });
  });
  next();
};

export default logger;
