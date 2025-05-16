// Filepath: server/src/config/connections.ts
// This file sets up the Sequelize connection to the PostgreSQL database using environment variables.

import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();
import { Sequelize } from 'sequelize';

// Create a new Sequelize instance using either a full DB URL or individual credentials from environment variables
const sequelize = process.env.DB_URL
    ? new Sequelize(process.env.DB_URL) // Use DB_URL if provided
    : new Sequelize(
        process.env.DB_NAME || '', // Database name
        process.env.DB_USER || '', // Database user
        process.env.DB_PASSWORD, // Database password
        {
            host: 'localhost', // Database host
            dialect: 'postgres', // Database dialect
            dialectOptions: {
                decimalNumbers: true, // Option for handling decimal numbers
            },
        }
    );

// Export the Sequelize instance for use in other parts of the application
export default sequelize;
