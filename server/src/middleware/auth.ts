import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
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

        return jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Forbidden' });
            }
            req.user = user as JwtPayload;
            return next();
        });
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};
