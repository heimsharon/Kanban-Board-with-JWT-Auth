// filepath: server/src/types/express/index.d.ts
// This file extends the Express Request interface to include a user property for authenticated requests.
declare namespace Express {
    interface Request {
        // The user property will be populated by authentication middleware (e.g., JWT)
        user?: {
            username: string;
        };
    }
}
