// Filepath: server/src/routes/api/index.ts
// This file defines the main API router for the application.
// It combines ticket and user route modules under their respective endpoints.
import { Router } from 'express';
import { ticketRouter } from './ticket-routes.js';
import { userRouter } from './user-routes.js';

// Create a new Express router instance
const router = Router();

// Mount the ticket routes at /tickets
router.use('/tickets', ticketRouter);

// Mount the user routes at /users
router.use('/users', userRouter);

// Export the combined router for use in the main server file
export default router;
