import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { profileRouter } from './routes/profile.js';
import { skillsRouter } from './routes/skills.js';
import { companiesRouter } from './routes/companies.js';
import { tasksRouter } from './routes/tasks.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

// Middleware
app.use(
  cors({
    origin: CORS_ORIGIN === '*' ? true : CORS_ORIGIN.split(','),
    credentials: true,
  })
);
app.use(express.json());

// Health Check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// API Routes
app.use('/api/profile', profileRouter);
app.use('/api/skills', skillsRouter);
app.use('/api/companies', companiesRouter);
app.use('/api/tasks', tasksRouter);

// 404 handler for API routes
app.use('/api/*', (_req: Request, res: Response) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Root welcome route
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'PathToPeak API Server is running',
    health: '/api/health',
    docs: {
      profile: '/api/profile',
      skills: '/api/skills',
      companies: '/api/companies',
      tasks: '/api/tasks',
    },
  });
});

// Global Error Handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ error: 'An unexpected internal server error occurred' });
});

// Start listening
app.listen(PORT, () => {
  console.log(`🚀 PathToPeak API Server listening on port ${PORT}`);
  console.log(`📡 Health check available at http://localhost:${PORT}/api/health`);
});
