// filepath: server/src/models/index.ts
// This file sets up the Sequelize connection to the PostgreSQL database and initializes the models.
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { UserFactory, User } from './user.js';
import { TicketFactory, Ticket } from './ticket.js';

// Load environment variables from .env file
dotenv.config();

// Create a new Sequelize instance using the database URL from environment variables
export const sequelize = new Sequelize(process.env.DB_URL || '', {
    dialect: 'postgres',
    dialectOptions: {
        decimalNumbers: true, // Option for handling decimal numbers
    },
});

// Initialize User and Ticket models
UserFactory(sequelize);
TicketFactory(sequelize);

// Define associations between models
// Each Ticket belongs to a User (assignedUser)
Ticket.belongsTo(User, { as: 'assignedUser', foreignKey: 'assignedUserId' });
// Each User can have many assigned Tickets
User.hasMany(Ticket, { as: 'assignedTickets', foreignKey: 'assignedUserId' });

// Export the models for use in other parts of the application
export { User, Ticket };
