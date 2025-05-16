const forceDatabaseRefresh = false;

import dotenv from 'dotenv';
dotenv.config();

import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Serves static files in the entire client's dist folder
app.use(express.static(path.join(__dirname, '../../client/dist'))); // Updated path

app.use(
    cors({
        origin: process.env.CLIENT_URL, // Allow requests from the frontend URL
        credentials: true, // Allow cookies and credentials
    })
);

app.use(express.json());
app.use(routes);

app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});
