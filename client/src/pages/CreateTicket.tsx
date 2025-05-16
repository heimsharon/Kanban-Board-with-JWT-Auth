// filepath: client/src/pages/createTicket.tsx
// This file is used to create the createTicket component
import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTicket } from '../api/ticketAPI';
import { TicketData } from '../interfaces/TicketData';
import { UserData } from '../interfaces/UserData';
import { retrieveUsers } from '../api/userAPI';

// Main component for the ticket creation form
const CreateTicket = () => {
    // State to store the new ticket data
    // The initial state is set to an object with default values
    const [newTicket, setNewTicket] = useState<TicketData | undefined>({
        id: 0,
        name: '',
        description: '',
        status: 'Todo',
        assignedUserId: 1,
        assignedUser: null,
        createdAt: '',
        updatedAt: '',
    });
    // useNavigate is a hook from react-router-dom that allows navigation to different routes
    const navigate = useNavigate();

    // State for the list of users(assigned users)
    // The initial state is set to an empty array
    const [users, setUsers] = useState<UserData[] | undefined>([]);

    // State for error messages to display to the user
    const [error, setError] = useState<string | null>(null);

    // This function fetches the users from the API, when the component is mounted, using the retrieveUsers function
    const getAllUsers = async () => {
        try {
            // If the user is logged in, fetch the users from the API
            const data = await retrieveUsers();
            // If the retrieval is successful, set the users state
            // and return the response data
            setUsers(data);
        } catch (err) {
            // If an error occurs during the retrieval process, log the error
            console.error('Failed to retrieve user info', err);
            // Error message to display to the user
            setError('Could not load users. Please try again.');
        }
    };
    // This function is called when the component is mounted
    useEffect(() => {
        // Check if the user is logged in before fetching users
        // If the user is logged in, fetch the users from the API
        getAllUsers();
    }, []);

    // The handleSubmit function is called when the form is submitted, creating new ticket
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        // Check if the newTicket state is defined
        if (newTicket) {
            try {
                // If it is defined, create a new ticket using the createTicket function
                // and pass the newTicket state as an argument
                const data = await createTicket(newTicket);
                // If the creation is successful, log the response data
                console.log(data);
                // Navigate to the home page using the useNavigate hook
                setError(null);
                navigate('/');
            } catch (err) {
                // If ticket creation fails, set an error message
                console.error('Failed to create ticket', err);
                // Error message to display to the user
                setError('Could not create ticket. Please try again.');
            }
        } else {
            // If the newTicket state is undefined, log an error message
            // and set an error message
            console.error('Ticket data is missing');
            // Error message to display to the user
            setError('Ticket data is missing. Cannot create ticket.');
        }
    };
    // Handle changes in textarea fields of the ticket; name and description
    const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        // Get the name and value of the textarea field
        const { name, value } = e.target;
        // If the newTicket state is defined, update it with the new value
        // Otherwise, set it to undefined
        setNewTicket((prev) => (prev ? { ...prev, [name]: value } : undefined));
    };
    // Handle changes in input/select field;status
    const handleTextChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        // Get the name and value of the input/select field
        const { name, value } = e.target;
        // If the newTicket state is defined, update it with the new value
        // Otherwise, set it to undefined
        setNewTicket((prev) => (prev ? { ...prev, [name]: value } : undefined));
    };
    // Handle changes in user assignment dropdown
    const handleUserChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        // Get the name and value of the input/select field
        const { name, value } = e.target;
        // If the newTicket state is defined, update it with the new value
        // Otherwise, set it to undefined
        setNewTicket((prev) => (prev ? { ...prev, [name]: value } : undefined));
    };

    return (
        <>
            {/* Container for the ticket creation form */}
            <div className="container">
                {/* Form for creating a new ticket */}
                <form className="form" onSubmit={handleSubmit}>
                    <h1>Create Ticket</h1>
                    {/* Display error message if ticket creation fails */}
                    {error && <div className="error-message">{error}</div>}
                    {/* Input for the ticket name */}
                    <label htmlFor="tName">Ticket Name</label>
                    <textarea
                        id="tName"
                        name="name"
                        value={newTicket?.name || ''}
                        onChange={handleTextAreaChange}
                    />
                    {/* Dropdown for selecting the ticket status */}
                    <label htmlFor="tStatus">Ticket Status</label>
                    <select
                        name="status"
                        id="tStatus"
                        value={newTicket?.status || ''}
                        onChange={handleTextChange}
                    >
                        <option value="Todo">Todo</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                    {/* Input for the ticket description */}
                    <label htmlFor="tDescription">Ticket Description</label>
                    <textarea
                        id="tDescription"
                        name="description"
                        value={newTicket?.description || ''}
                        onChange={handleTextAreaChange}
                    />
                    {/* Dropdown for assigning the ticket to a user */}
                    <label htmlFor="tUserId">User's ID</label>
                    <select
                        name="assignedUserId"
                        value={newTicket?.assignedUserId || ''}
                        onChange={handleUserChange}
                    >
                        {/* Populate the dropdown with users from the API */}
                        {users ? (
                            users.map((user) => {
                                return (
                                    <option
                                        key={user.id}
                                        value={String(user.id)}
                                    >
                                        {user.username}
                                    </option>
                                );
                            })
                        ) : (
                            // Fallback textarea if users are not loaded
                            <textarea
                                id="tUserId"
                                name="assignedUserId"
                                value={newTicket?.assignedUserId || 0}
                                onChange={handleTextAreaChange}
                            />
                        )}
                    </select>
                    {/* Submit button for the form */}
                    <button type="submit" onSubmit={handleSubmit}>
                        Submit Form
                    </button>
                </form>
            </div>
        </>
    );
};

export default CreateTicket;
