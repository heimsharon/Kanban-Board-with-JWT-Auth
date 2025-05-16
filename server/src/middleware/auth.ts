// filepath: server/src/middleware/auth.ts
// This file contains middleware for authenticating JWT tokens in incoming requests.
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Define the expected shape of the JWT payload
interface JwtPayload {
    username: string;
}

// Middleware to authenticate JWT tokens in incoming requests
export const authenticateToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Get the Authorization header from the request
    const authHeader = req.headers.authorization;
    if (authHeader) {
        // Extract the token from the header (format: "Bearer <token>")
        const token = authHeader.split(' ')[1];
        const secretKey = process.env.JWT_SECRET_KEY || '';

        // Verify the token using the secret key
        return jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                // If verification fails, respond with 403 Forbidden
                return res.status(403).json({ message: 'Forbidden' });
            }
            // Attach the decoded user info to the request object
            req.user = user as JwtPayload;
            // Continue to the next middleware or route handler
            return next();
        });
    } else {
        // If no token is provided, respond with 401 Unauthorized
        return res.status(401).json({ message: 'Unauthorized' });
    }
};
