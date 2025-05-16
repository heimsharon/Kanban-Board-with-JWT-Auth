// filepath: server/src/controllers/ticket-controller.ts
// This file contains the controller functions for handling ticket-related API endpoints.
import { Request, Response } from 'express';
import { User } from '../models/index.js';
import { Ticket } from '../models/index.js';
import { Order } from 'sequelize';

// GET /tickets - Retrieve all tickets, with optional sorting and filtering by user
export const getAllTickets = async (req: Request, res: Response) => {
    try {
        // Get sorting and filtering parameters from the query string
        const sortBy = (req.query.sortBy as string) || 'createdAt';
        const userId = req.query.userId as string | undefined;
        const validSortFields = ['createdAt', 'updatedAt', 'name'];
        // Determine the order for sorting
        const order: Order = validSortFields.includes(sortBy)
            ? ([[sortBy, 'ASC']] as Order)
            : ([['createdAt', 'ASC']] as Order);

        // Filtering by assigned user
        let where: any = {};
        if (userId && userId !== 'All') {
            if (userId === 'unassigned') {
                where.assignedUserId = null;
            } else {
                where.assignedUserId = userId;
            }
        }

        // Query the database for tickets, including the assigned user's username
        const tickets = await Ticket.findAll({
            where,
            include: [
                {
                    model: User,
                    as: 'assignedUser',
                    attributes: ['username'],
                },
            ],
            order,
        });
        // Return the list of tickets as JSON
        res.json(tickets);
    } catch (error: any) {
        // Handle errors and return a 500 status to console
        console.error('Error retrieving tickets:', error);
        res.status(500).json({
            // Display error message to the user
            message: 'Could not retrieve tickets. Please try again later.',
        });
    }
};

// GET /tickets/:id - Retrieve a single ticket by its ID
export const getTicketById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        // Find the ticket by primary key and include the assigned user's username
        const ticket = await Ticket.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'assignedUser', // This should match the alias defined in the association
                    attributes: ['username'], // Include only the username attribute
                },
            ],
        });
        if (ticket) {
            // If found, return the ticket as JSON
            res.json(ticket);
        } else {
            // If not found, return a 404 error
            res.status(404).json({
                // Display error message to the user
                message: 'Ticket not found with the provided ID.',
            });
        }
    } catch (error: any) {
        // Handle errors and return a 500 status
        console.error('Error retrieving ticket by ID:', error);
        res.status(500).json({
            // Display error message to the user
            message: 'Could not retrieve ticket. Please try again later.',
        });
    }
};

// POST /tickets - Create a new ticket
export const createTicket = async (req: Request, res: Response) => {
    const { name, status, description, assignedUserId } = req.body;
    try {
        // Create a new ticket in the database
        const newTicket = await Ticket.create({
            name,
            status,
            description,
            assignedUserId,
        });
        // Return the created ticket with a 201 status
        res.status(201).json(newTicket);
    } catch (error: any) {
        // Handle errors and return a 400 status
        console.error('Error creating ticket:', error);
        res.status(400).json({
            // Display error message to the user
            message:
                'Could not create ticket. Please check your input and try again.',
        });
    }
};

// PUT /tickets/:id - Update an existing ticket by its ID
export const updateTicket = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, status, description, assignedUserId } = req.body;
    try {
        // Find the ticket by primary key
        const ticket = await Ticket.findByPk(id);
        if (ticket) {
            // Update the ticket fields
            ticket.name = name;
            ticket.status = status;
            ticket.description = description;
            ticket.assignedUserId = assignedUserId;
            await ticket.save();
            // Return the updated ticket as JSON
            res.json(ticket);
        } else {
            // If not found, return a 404 error
            res.status(404).json({
                // Display error message to the user
                message: 'Ticket not found with the provided ID.',
            });
        }
    } catch (error: any) {
        // Handle errors and return a 400 status
        console.error('Error updating ticket:', error);
        res.status(400).json({
            // Display error message to the user
            message:
                'Could not update ticket. Please check your input and try again.',
        });
    }
};

// DELETE /tickets/:id - Delete a ticket by its ID
export const deleteTicket = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        // Find the ticket by primary key
        const ticket = await Ticket.findByPk(id);
        if (ticket) {
            // Delete the ticket from the database
            await ticket.destroy();
            // Return a success message
            res.json({ message: 'Ticket deleted successfully.' });
        } else {
            // If not found, return a 404 error
            res.status(404).json({
                // Display error message to the user
                message: 'Ticket not found with the provided ID.',
            });
        }
    } catch (error: any) {
        // Handle errors and return a 500 status
        console.error('Error deleting ticket:', error);
        res.status(500).json({
            // Display error message to the user
            message: 'Could not delete ticket. Please try again later.',
        });
    }
};
