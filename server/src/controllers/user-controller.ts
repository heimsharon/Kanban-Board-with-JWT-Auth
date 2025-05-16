// filepath: server/src/controllers/user-controller.ts
// This file contains the controller functions for handling user-related API endpoints.
import { Request, Response } from 'express';
import { User } from '../models/index.js';

// GET /Users - Retrieve all users (excluding passwords)
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        // Fetch all users from the database, excluding the password attribute
        const users = await User.findAll({
            attributes: { exclude: ['password'] },
        });
        // Return the list of users as JSON
        res.json(users);
    } catch (error: any) {
        // Log error and return a user-friendly message
        console.error('Error retrieving users:', error);
        res.status(500).json({
            message: 'Could not retrieve users. Please try again later.',
        });
    }
};

// GET /Users/:id - Retrieve a single user by ID (excluding password)
export const getUserById = async (req: Request, res: Response) => {
    // Extract the user ID from the request parameters
    // The ID is expected to be passed in the URL as a parameter
    const { id } = req.params;
    try {
        // Find the user by primary key and exclude the password attribute
        const user = await User.findByPk(id, {
            attributes: { exclude: ['password'] },
        });
        if (user) {
            // If the user is found, return the user data as JSON
            res.json(user);
        } else {
            // If the user is not found, return a 404 status with a message
            res.status(404).json({
                message: 'User not found with the provided ID.',
            });
        }
    } catch (error: any) {
        // Log error and return a user-friendly message
        console.error('Error retrieving user by ID:', error);
        res.status(500).json({
            message: 'Could not retrieve user. Please try again later.',
        });
    }
};

// POST /Users - Create a new user
export const createUser = async (req: Request, res: Response) => {
    // Extract the username and password from the request body
    // The request body is expected to be in JSON format
    const { username, password } = req.body;
    try {
        // Check if the username already exists in the database
        const newUser = await User.create({ username, password });
        // If the user is created successfully, return the new user data as JSON
        res.status(201).json(newUser);
    } catch (error: any) {
        // Log error and return a user-friendly message
        console.error('Error creating user:', error);
        res.status(400).json({
            message:
                'Could not create user. Please check your input and try again.',
        });
    }
};

// PUT /Users/:id - Update an existing user by ID
export const updateUser = async (req: Request, res: Response) => {
    // Extract the user ID from the request parameters
    const { id } = req.params;
    // Extract the username and password from the request body
    // The request body is expected to be in JSON format
    const { username, password } = req.body;
    try {
        // Find the user by primary key
        const user = await User.findByPk(id);
        // If the user is found, update the username and password
        if (user) {
            user.username = username;
            user.password = password;
            await user.save(); // Save the updated user to the database
            // Return the updated user data as JSON
            // The password attribute is excluded from the response
            res.json(user);
        } else {
            // If the user is not found, return a 404 status with a message
            res.status(404).json({
                message: 'User not found with the provided ID.',
            });
        }
    } catch (error: any) {
        // Log error and return a user-friendly message
        console.error('Error updating user:', error);
        res.status(400).json({
            message:
                'Could not update user. Please check your input and try again.',
        });
    }
};

// DELETE /Users/:id - Delete a user by ID
export const deleteUser = async (req: Request, res: Response) => {
    // Extract the user ID from the request parameters
    const { id } = req.params;
    // The ID is expected to be passed in the URL as a parameter
    // The ID is expected to be a string
    try {
        // Find the user by primary key
        const user = await User.findByPk(id);
        // If the user is found, delete the user from the database
        if (user) {
            await user.destroy(); // Delete the user
            // Return a success message as JSON
            res.json({ message: 'User deleted successfully.' });
        } else {
            // If the user is not found, return a 404 status with a message
            res.status(404).json({
                message: 'User not found with the provided ID.',
            });
        }
    } catch (error: any) {
        // Log error and return a user-friendly message
        console.error('Error deleting user:', error);
        res.status(500).json({
            message: 'Could not delete user. Please try again later.',
        });
    }
};
