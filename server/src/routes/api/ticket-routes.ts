// filepath: server/src/routes/api/ticket-routes.ts
// This file defines the ticket-related routes for the API.
import express from 'express';
import {
    getAllTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket,
} from '../../controllers/ticket-controller.js';

// Create a new Express router instance
// It will be mounted at /tickets in the main API router
const router = express.Router();

// GET /tickets - Get all tickets
router.get('/', getAllTickets);

// GET /tickets/:id - Get a ticket by id
router.get('/:id', getTicketById);

// POST /tickets - Create a new ticket
router.post('/', createTicket);

// PUT /tickets/:id - Update a ticket by id
router.put('/:id', updateTicket);

// DELETE /tickets/:id - Delete a ticket by id
router.delete('/:id', deleteTicket);

// Export the router to be used in the main API router
export { router as ticketRouter };
