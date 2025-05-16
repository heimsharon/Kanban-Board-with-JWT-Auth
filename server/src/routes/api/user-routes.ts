// filepath: server/src/routes/api/user-routes.ts
// This file defines the user-related routes for the API.
import express from 'express';
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} from '../../controllers/user-controller.js';

// Create a new Express router instance
// It will be mounted at /users in the main API router
const router = express.Router();

// GET /users - Get all users
router.get('/', getAllUsers);

// GET /users/:id - Get a user by id
router.get('/:id', getUserById);

// POST /users - Create a new user
router.post('/', createUser);

// PUT /users/:id - Update a user by id
router.put('/:id', updateUser);

// DELETE /users/:id - Delete a user by id
router.delete('/:id', deleteUser);

// Export the router to be used in the main API router
export { router as userRouter };
