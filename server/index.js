import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createContactService, getMailConfiguration } from './contact-service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
dotenv.config({ path: path.join(rootDir, '.env') });

export function createApp({ env = process.env, deliverEmail } = {}) {
  const app = express();
  const sendContactMessage = createContactService({ env, deliverEmail });

  app.disable('x-powered-by');
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(express.json({ limit: '16kb' }));

  const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 6,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { ok: false, message: 'Too many messages were submitted. Please wait a little and try again.' },
  });

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, emailConfigured: getMailConfiguration(env).configured });
  });

  app.post('/api/contact', contactLimiter, async (req, res) => {
    const result = await sendContactMessage(req.body);
    return res.status(result.status).json(result.body);
  });

  const distPath = path.join(rootDir, 'dist');
  app.use(express.static(distPath, { index: false }));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    return res.sendFile(path.join(distPath, 'index.html'), (error) => { if (error) next(); });
  });

  app.use((error, _req, res, _next) => {
    if (error?.type === 'entity.too.large') {
      return res.status(413).json({ ok: false, message: 'The request is too large. Please shorten your message and try again.' });
    }
    if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
      return res.status(400).json({ ok: false, message: 'The request could not be read. Please try again.' });
    }
    console.error('Unexpected API error.');
    return res.status(500).json({ ok: false, message: 'Something went wrong. Please try again later.' });
  });

  return app;
}

function startServer() {
  const config = getMailConfiguration(process.env);
  if (!config.configured) {
    console.warn(`Contact email is not configured. Missing or invalid: ${config.missing.join(', ')}`);
  }
  const port = Number(process.env.PORT || 4174);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    console.error('Invalid PORT: expected an integer from 1 to 65535.');
    process.exitCode = 1;
    return;
  }
  const app = createApp();
  const server = app.listen(port, () => console.log(`Portfolio server listening on http://127.0.0.1:${port}`));
  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${port} is already in use. Stop the process using it or set PORT to another available port.`);
    } else {
      console.error(`Portfolio server failed to start (${error.code || 'unknown error'}).`);
    }
    process.exitCode = 1;
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) startServer();
