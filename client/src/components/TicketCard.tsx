// Filepath: client/src/components/TicketCard.tsx
// This file contains the TicketCard component, which displays ticket information

import { Link } from 'react-router-dom';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';
import { MouseEventHandler, useState } from 'react';

// This interface defines the structure of the props that the TicketCard component will receive
interface TicketCardProps {
    ticket: TicketData;
    deleteTicket: (ticketId: number) => Promise<ApiMessage>;
}

// The TicketCard component is a functional component that takes in props
// It displays the details of a ticket and provides options to edit or delete it
const TicketCard = ({ ticket, deleteTicket }: TicketCardProps) => {
    // State for error messages to display to the user if deletion fails
    const [error, setError] = useState<string | null>(null);

    const handleDelete: MouseEventHandler<HTMLButtonElement> = async (
        event
    ) => {
        // Prevent the default action of the button
        const ticketId = Number(event.currentTarget.value);
        // Convert the ticket ID to a number
        // This is necessary because the value of the button is a string
        if (!isNaN(ticketId)) {
            try {
                // Call the deleteTicket function passed as a prop
                // This function is expected to return a promise that resolves to an ApiMessage
                const data = await deleteTicket(ticketId);
                setError(null); // Clear any previous error
                return data;
            } catch (error) {
                // If an error occurs during the deletion process, log the error
                console.error('Failed to delete ticket:', error);
                // Set an error message to display to the user
                setError('Could not delete ticket. Please try again.');
            }
        }
    };

    return (
        <div className="ticket-card">
            {/* Display error message if ticket deletion fails */}
            {error && <div className="error-message">{error}</div>}
            {/* Display the ticket name */}
            <h3>{ticket.name}</h3>
            {/* Display the ticket description */}
            <p>{ticket.description}</p>
            {/* Display the assigned user's username or 'Unassigned' if not assigned */}
            <p>Assigned to: {ticket.assignedUser?.username || 'Unassigned'}</p>
            {/* Display the ticket creation and last updated timestamps */}
            <p>
                Created:{' '}
                {ticket.createdAt
                    ? new Date(ticket.createdAt).toLocaleString()
                    : ''}
                <br />
                Updated:{' '}
                {ticket.updatedAt
                    ? new Date(ticket.updatedAt).toLocaleString()
                    : ''}
            </p>
            {/* Link to the edit ticket page, passing the ticket ID in state */}
            <Link
                to="/edit"
                state={{ id: ticket.id }}
                type="button"
                className="editBtn"
            >
                Edit
            </Link>
            {/* Button to delete the ticket */}
            <button
                type="button"
                value={String(ticket.id)}
                onClick={handleDelete}
                className="deleteBtn"
            >
                Delete
            </button>
        </div>
    );
};

export default TicketCard;
