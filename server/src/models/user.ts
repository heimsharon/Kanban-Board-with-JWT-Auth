// Filepath: server/src/models/user.ts
// This file defines the User model for the database using Sequelize.
import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt';

// Define the attributes for the User model
interface UserAttributes {
    id: number;
    username: string;
    password: string;
}

// Define the attributes required for creating a User (id is optional)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Define the User model class
export class User
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes
{
    public id!: number;
    public username!: string;
    public password!: string;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // Hash the password before saving the user
    public async setPassword(password: string) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(password, saltRounds);
    }
}

// Factory function to initialize the User model with Sequelize
export function UserFactory(sequelize: Sequelize): typeof User {
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: 'users', // Name of the table in the database
            sequelize, // Sequelize instance
            hooks: {
                // Hash the password before creating a new user
                beforeCreate: async (user: User) => {
                    await user.setPassword(user.password);
                },
                // Hash the password before updating an existing user
                beforeUpdate: async (user: User) => {
                    await user.setPassword(user.password);
                },
            },
        }
    );

    return User;
}
