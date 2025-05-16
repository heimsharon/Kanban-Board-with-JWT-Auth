const forceDatabaseRefresh = false;

import express from 'express';
import sequelize from './config/connections.js';
import routes from './routes/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3001;

// ES module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Absolute path to client/dist
const clientDistPath = path.join(__dirname, '../../client/dist');

// Serve static files from client/dist
app.use(express.static(clientDistPath));

app.use(express.json());
app.use(routes);

// Serve index.html for any non-API route (for React Router)
app.get('*', (_req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
});

sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});
