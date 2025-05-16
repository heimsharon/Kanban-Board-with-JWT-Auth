import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()
interface JwtPayload {
    username: string;
}

export const authenticateToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        const secretKey = process.env.JWT_SECRET_KEY || '';

        try {
            jwt.verify(token, secretKey, (err, user) => {
                if (err) {
                    res.sendStatus(403); // Forbidden
                    return;
                }

                req.user = user as JwtPayload;
                return next();
            });

        } catch (error) {
            console.error(
                'Error verifying token:', error);
            res.sendStatus(500); // Internal Server Error
            return;
            return res.sendStatus(500); // Internal Server Error
        }
        res.sendStatus(401); // Unauthorized
        return;
    } else {
        return res.sendStatus(401); // Unauthorized
    }
};
