import { Request, Response } from 'express';
import { User } from '../models/index.js';
import { Ticket } from '../models/index.js';
import { Order } from 'sequelize';

// GET /tickets
export const getAllTickets = async (req: Request, res: Response) => {
    try {
        const sortBy = (req.query.sortBy as string) || 'createdAt';
        const validSortFields = ['createdAt', 'name', 'status'];
        const order: Order = validSortFields.includes(sortBy)
            ? ([[sortBy, 'ASC']] as Order)
            : ([['createdAt', 'ASC']] as Order);

        const tickets = await Ticket.findAll({
            include: [
                {
                    model: User,
                    as: 'assignedUser',
                    attributes: ['username'],
                },
            ],
            order,
        });
        res.json(tickets);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// GET /tickets/:id
export const getTicketById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
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
            res.json(ticket);
        } else {
            res.status(404).json({ message: 'Ticket not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// POST /tickets
export const createTicket = async (req: Request, res: Response) => {
    const { name, status, description, assignedUserId } = req.body;
    try {
        const newTicket = await Ticket.create({
            name,
            status,
            description,
            assignedUserId,
        });
        res.status(201).json(newTicket);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// PUT /tickets/:id
export const updateTicket = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, status, description, assignedUserId } = req.body;
    try {
        const ticket = await Ticket.findByPk(id);
        if (ticket) {
            ticket.name = name;
            ticket.status = status;
            ticket.description = description;
            ticket.assignedUserId = assignedUserId;
            await ticket.save();
            res.json(ticket);
        } else {
            res.status(404).json({ message: 'Ticket not found' });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE /tickets/:id
export const deleteTicket = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const ticket = await Ticket.findByPk(id);
        if (ticket) {
            await ticket.destroy();
            res.json({ message: 'Ticket deleted' });
        } else {
            res.status(404).json({ message: 'Ticket not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
