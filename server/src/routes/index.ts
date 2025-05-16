//Filepath: server/src/routes/index.ts
// This file defines the main router for the server, combining authentication and API routes.
import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

// Create a new Express router instance
const router = Router();

// Mount authentication routes at /auth (no authentication required for login/register)
router.use('/auth', authRoutes);

// Mount API routes at /api, protected by JWT authentication middleware
router.use('/api', authenticateToken, apiRoutes);

// Export the combined router for use in the main server file
export default router;
