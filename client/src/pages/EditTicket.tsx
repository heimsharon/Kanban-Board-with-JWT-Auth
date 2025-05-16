// filepath: client/src/pages/EditTicket.tsx
// This file is used to create the EditTicket component
import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { retrieveTicket, updateTicket } from '../api/ticketAPI';
import { TicketData } from '../interfaces/TicketData';

// Main component for the ticket editing form
const EditTicket = () => {
    // State to store the ticket data
    // The initial state is set to undefined
    const [ticket, setTicket] = useState<TicketData | undefined>();
    // State for error messages to display to the user
    const [error, setError] = useState<string | null>(null);
    // useNavigate is a hook from react-router-dom that allows navigation to different routes
    const navigate = useNavigate();

    // useLocation is a hook from react-router-dom that returns the current location object
    // The state object contains the ticket ID passed from the previous page
    const { state } = useLocation();

    // The state object is expected to contain a ticket ID
    // If the state is not defined, set the ticket ID to null
    const fetchTicket = async (ticketId: TicketData) => {
        try {
            // Check if the ticket ID is null or number
            const data = await retrieveTicket(ticketId.id);
            // If the retrieval is successful, set the ticket state
            // and return the response data
            setTicket(data);
            setError(null); // Clear any previous error
        } catch (err) {
            // If an error occurs during the retrieval process, log the error
            // and set the ticket state to undefined
            console.error('Failed to retrieve ticket:', err);
            setTicket(undefined);
            // Error message to display to the user
            setError('Could not load ticket. Please try again.');
        }
    };
    // This function is called when the component is mounted
    // It fetches the ticket data from the API using the ticket ID passed from the previous page
    useEffect(() => {
        fetchTicket(state);
    }, [state]);

    // The handleSubmit function is called when the form is submitted, updating the ticket
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (ticket && ticket.id !== null) {
            try {
                // Check if the ticket state is defined and the ticket ID is not null
                // If it is defined, update the ticket using the updateTicket function
                await updateTicket(ticket.id, ticket);
                setError(null); // Clear any previous error
                navigate('/'); // Navigate to the home page after updating the ticket
            } catch (err) {
                // If update fails, set an error message
                console.error('Failed to update ticket:', err);
                // Error message to display to the user
                setError('Could not update ticket. Please try again.');
            }
        } else {
            // If the ticket state is undefined, log an error message
            // and do not proceed with the update
            console.error('Ticket data is undefined.');
            // Error message to display to the user
            setError('Ticket data is missing. Cannot update.');
        }
    };
    // The handleTextAreaChange function is called when the text area value changes
    const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        // Get the name and value of the text area
        const { name, value } = e.target;
        // If the ticket state is defined, update it with the new value
        // Otherwise, set the ticket state to undefined
        setTicket((prev) => (prev ? { ...prev, [name]: value } : undefined));
    };
    // The handleChange function is called when the select field value changes
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        // Get the name and value of the select field
        const { name, value } = e.target;
        // If the ticket state is defined, update it with the new value
        // Otherwise, set the ticket state to undefined
        setTicket((prev) => (prev ? { ...prev, [name]: value } : undefined));
    };

    return (
        <>
            <div className="container">
                {/* Display error message if there is an error */}
                {error && <div className="error-message">{error}</div>}
                {ticket ? (
                    // If the ticket data is available, render the edit form
                    <form className="form" onSubmit={handleSubmit}>
                        <h1>Edit Ticket</h1>
                        {/* Input for editing the ticket name */}
                        <label htmlFor="tName">Ticket Name</label>
                        <textarea
                            id="tName"
                            name="name"
                            value={ticket.name || ''}
                            onChange={handleTextAreaChange}
                        />
                        {/* Dropdown for editing the ticket status */}
                        <label htmlFor="tStatus">Ticket Status</label>
                        <select
                            name="status"
                            id="tStatus"
                            value={ticket.status || ''}
                            onChange={handleChange}
                        >
                            <option value="Todo">Todo</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                        {/* Input for editing the ticket description */}
                        <label htmlFor="tDescription">Ticket Description</label>
                        <textarea
                            id="tDescription"
                            name="description"
                            value={ticket.description || ''}
                            onChange={handleTextAreaChange}
                        />
                        {/* Submit button to update the ticket */}
                        <button type="submit">Submit Form</button>
                    </form>
                ) : (
                    // If the ticket data is not available, show an error message
                    <div>Issues fetching ticket</div>
                )}
            </div>
        </>
    );
};

export default EditTicket;
