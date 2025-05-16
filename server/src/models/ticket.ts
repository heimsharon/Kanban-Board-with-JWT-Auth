// filepath: server/src/models/ticket.ts
// This file defines the Ticket model for the database using Sequelize.
import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { User } from './user';

// Define the attributes for the Ticket model
interface TicketAttributes {
    id: number;
    name: string;
    status: string;
    description: string;
    assignedUserId?: number; // Foreign key to User (optional)
}

// Define the attributes required for creating a Ticket (id is optional)
interface TicketCreationAttributes extends Optional<TicketAttributes, 'id'> {}

// Define the Ticket model class
export class Ticket
    extends Model<TicketAttributes, TicketCreationAttributes>
    implements TicketAttributes
{
    public id!: number;
    public name!: string;
    public status!: string;
    public description!: string;
    public assignedUserId!: number;

    // Associated User model (if included in query)
    public readonly assignedUser?: User;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Factory function to initialize the Ticket model with Sequelize
export function TicketFactory(sequelize: Sequelize): typeof Ticket {
    Ticket.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            assignedUserId: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        },
        {
            tableName: 'tickets', // Name of the table in the database
            sequelize, // Sequelize instance
        }
    );

    return Ticket;
}
