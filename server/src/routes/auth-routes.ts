// filepath: server/src/api/auth-routes.ts
// This file defines the authentication routes for the application.
import { Router, Request, Response } from 'express';
import { User } from '../models/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Controller function to handle user login and JWT generation
export const login = async (req: Request, res: Response) => {
    // Extract username and password from the request body
    // The request body is expected to be in JSON format
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ where: { username } });

        // If user not found, return authentication failed
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        // Compare the provided password with the hashed password in the database
        const passwordIsValid = await bcrypt.compare(password, user.password);

        // If password is invalid, return authentication failed
        if (!passwordIsValid) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        // Get the JWT secret key from environment variables
        const secretKey = process.env.JWT_SECRET_KEY;

        // If secret key is not configured, return server error
        if (!secretKey) {
            return res
                .status(500)
                .json({ message: 'JWT secret key is not configured' });
        }

        // Sign a JWT token with the username as payload, expires in 1 hour
        const token = jwt.sign({ username }, secretKey, {
            expiresIn: '1h',
        });

        // Return the token to the client
        return res.json({ token });
    } catch (error) {
        // Log error and return a generic server error message
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
// Create a new Express router instance
// This router will be mounted at /auth in the main server file
const router = Router();

// POST /login - Login a user and return a JWT token
router.post('/login', login);

// Export the router for use in the main server file
export default router;
