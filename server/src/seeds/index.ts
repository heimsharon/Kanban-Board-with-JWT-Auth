// Filepath: server/src/seeds/index.ts
// This file runs all seed scripts to populate the database with initial data.
import { seedUsers } from './user-seeds.js';
import { seedTickets } from './ticket-seeds.js';
import { sequelize } from '../models/index.js';

// Main function to run all seeders in order
const seedAll = async (): Promise<void> => {
    try {
        // Sync the database and drop/recreate all tables
        await sequelize.sync({ force: true });
        console.log('\n----- DATABASE SYNCED -----\n');

        // Seed users
        await seedUsers();
        console.log('\n----- USERS SEEDED -----\n');

        // Seed tickets
        await seedTickets();
        console.log('\n----- TICKETS SEEDED -----\n');

        // Exit process successfully
        process.exit(0);
    } catch (error) {
        // Log any errors and exit with failure
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

// Execute the seeding process
seedAll();
