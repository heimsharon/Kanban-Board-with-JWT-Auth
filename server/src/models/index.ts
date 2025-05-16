import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { UserFactory, User } from './user.js';
import { TicketFactory, Ticket } from './ticket.js';

dotenv.config();

export const sequelize = new Sequelize(process.env.DB_URL || '', {
    dialect: 'postgres',
    dialectOptions: {
        decimalNumbers: true,
    },
});

// Initialize models
UserFactory(sequelize);
TicketFactory(sequelize);

// Define associations ONCE here
Ticket.belongsTo(User, { as: 'assignedUser', foreignKey: 'assignedUserId' });
User.hasMany(Ticket, { as: 'assignedTickets', foreignKey: 'assignedUserId' });

export { User, Ticket };
