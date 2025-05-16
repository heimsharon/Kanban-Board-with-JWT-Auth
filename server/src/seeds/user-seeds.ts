// Filepath: server/src/seeds/user-seeds.ts
// This file seeds the User table with initial user data.
import { User } from '../models/user.js';

// Function to seed the User table with sample users
export const seedUsers = async () => {
    await User.bulkCreate(
        [
            { username: 'JollyGuru', password: 'password' },
            { username: 'SunnyScribe', password: 'password' },
            { username: 'RadiantComet', password: 'password' },
        ],
        { individualHooks: true } // Ensures password hashing hooks are run for each user
    );
};
