// Filepath: server/src/server.ts
// This file sets up and starts the Express server, connects to the database, and serves the React client.

const forceDatabaseRefresh = false; // Set to true to drop and recreate all tables on server start (useful for development/testing only)

import express from 'express';
import sequelize from './config/connections.js';
import routes from './routes/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Create an instance of the Express application
const app = express();
// Load environment variables from .env file
const PORT = process.env.PORT || 3001;

// ES module fix for __dirname
// Use fileURLToPath to convert the module URL to a file path
const __filename = fileURLToPath(import.meta.url);
// Use path.dirname to get the directory name of the current module
const __dirname = path.dirname(__filename);

// Absolute path to client/dist (React build output)
const clientDistPath = path.join(__dirname, '../../client/dist');

// Serve static files from client/dist
app.use(express.static(clientDistPath));

// Parse incoming JSON requests
app.use(express.json());

// Mount all API and auth routes
app.use(routes);

// Serve index.html for any non-API route (for React Router SPA support)
app.get('*', (_req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
});

// Sync the database and start the server
sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
    app.listen(PORT, () => {
        // Log the server start and database sync status
        console.log(`Server is listening on port ${PORT}`);
    });
});
