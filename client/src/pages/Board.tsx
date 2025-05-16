//Filepath: client/src/pages/Board.tsx
// This file is used to create the board component
import { useEffect, useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { retrieveTickets, deleteTicket } from '../api/ticketAPI';
import { retrieveUsers } from '../api/userAPI';
import ErrorPage from './ErrorPage';
import Swimlane from '../components/Swimlane';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';
import { UserData } from '../interfaces/UserData';
import auth from '../utils/auth';

// The boardStates array contains the different states of the tickets
const boardStates = ['Todo', 'In Progress', 'Done'];

// The Board component is the main component that displays the tickets
// It uses the useState and useEffect hooks to manage the state and lifecycle of the component
const Board = () => {
    const [tickets, setTickets] = useState<TicketData[]>([]); // State to store the tickets
    const [users, setUsers] = useState<UserData[]>([]); // State to store the users
    const [error, setError] = useState(false); // State to store the error (for fatal errors)
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for user error messages
    const [loginCheck, setLoginCheck] = useState(false); // State to check if the user is logged in
    const [sortBy, setSortBy] = useState<'createdAt' | 'updatedAt' | 'name'>( // State to store the sorting criteria
        'createdAt'
    );
    const [filterUser, setFilterUser] = useState<string>('All'); // State to store the filter criteria

    // This function checks if the user is logged in
    const checkLogin = () => {
        if (auth.loggedIn()) {
            setLoginCheck(true);
        }
    };

    // This function fetches the tickets from the API using the retrieveTickets function
    const fetchTickets = async () => {
        try {
            // It uses the sortBy and filterUser state variables to filter and sort the tickets
            const data = await retrieveTickets(sortBy, filterUser);
            setTickets(data);
            setErrorMessage(null); // Clear any previous user error message
            // If the retrieval is successful, set the tickets state
            // and return the response data
        } catch (err) {
            // If an error occurs during the retrieval process, log the error
            console.error('Failed to retrieve tickets:', err);
            setError(true);
            // Error message to display to the user
            setErrorMessage('Could not load tickets. Please try again.');
        }
    };

    // This function fetches the users from the API using the retrieveUsers function
    const fetchUsers = async () => {
        try {
            // Check if the user is logged in before fetching users
            const data = await retrieveUsers();
            setUsers(data);
            setErrorMessage(null); // Clear any previous user error message
            // If the retrieval is successful, set the users state
            // and return the response data
        } catch (err) {
            // If an error occurs during the retrieval process, log the error
            console.error('Failed to retrieve users:', err);
            // Error message to display to the user
            setErrorMessage('Could not load users. Please try again.');
        }
    };
    // This function deletes a ticket from the API using the deleteTicket function
    const deleteIndvTicket = async (ticketId: number): Promise<ApiMessage> => {
        try {
            // Check if the user is logged in before deleting a ticket
            const data = await deleteTicket(ticketId);
            fetchTickets();
            setErrorMessage(null); // Clear any previous user error message
            // If the deletion is successful, fetch the updated tickets
            // and return the response data
            return data;
        } catch (err) {
            // If an error occurs during the deletion process, log the error
            console.error('Could not delete ticket:', err);
            // Error message to display to the user
            setErrorMessage('Could not delete ticket. Please try again.');
            return Promise.reject(err);
        }
    };
    // This useLayoutEffect hook runs the checkLogin function when the component mounts
    useLayoutEffect(() => {
        checkLogin();
    }, []);

    // This useEffect hook runs the fetchTickets and fetchUsers functions
    // when the component mounts or when the sortBy or filterUser state variables change
    // It also runs when the loginCheck state variable changes, ensuring that tickets and users are fetched only when the user is logged in
    useEffect(() => {
        if (loginCheck) {
            fetchTickets();
            fetchUsers();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginCheck, sortBy, filterUser]);

    if (error) {
        // If an error occurs during the retrieval process, set the error state to true
        // and return the ErrorPage component
        return <ErrorPage />;
    }

    // Render the board UI
    // If the user is not logged in, show a notice prompting them to log in
    // Otherwise, display the board with ticket creation, sorting, filtering, and swimlanes
    return (
        <>
            {!loginCheck ? (
                // Show a message if the user is not logged in
                <div className="login-notice">
                    <h1>Login to create & view tickets</h1>
                </div>
            ) : (
                // Main board UI for logged-in users
                <div className="board">
                    {/* Display user error messages if any */}
                    {errorMessage && (
                        <div className="error-message">{errorMessage}</div>
                    )}
                    {/* Button to navigate to the ticket creation page */}
                    <button type="button" id="create-ticket-link">
                        <Link to="/create">New Ticket</Link>
                    </button>
                    {/* Controls for sorting and filtering tickets */}
                    <div style={{ margin: '1em 0' }}>
                        {/* Dropdown to select the sorting criteria for tickets */}
                        <label htmlFor="sortBy">Sort by: </label>
                        <select
                            id="sortBy"
                            value={sortBy}
                            onChange={(e) =>
                                setSortBy(
                                    e.target.value as
                                        | 'createdAt'
                                        | 'updatedAt'
                                        | 'name'
                                )
                            }
                        >
                            <option value="createdAt">Created At</option>
                            <option value="updatedAt">Last Updated</option>
                            <option value="name">Ticket Name</option>
                        </select>
                        {/* Dropdown to filter tickets by assigned user */}
                        <label
                            htmlFor="filterUser"
                            style={{ marginLeft: '1em' }}
                        >
                            Filter by User:{' '}
                        </label>
                        <select
                            id="filterUser"
                            value={filterUser}
                            onChange={(e) => setFilterUser(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="unassigned">Unassigned</option>
                            {/* Dynamically populate user options */}
                            {users.map((user) => (
                                <option key={user.id} value={String(user.id)}>
                                    {user.username}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Display swimlanes for each board state (Todo, In Progress, Done) */}
                    <div className="board-display">
                        {boardStates.map((status) => {
                            // Filter tickets based on selected user and status
                            const filteredTickets = tickets.filter((ticket) => {
                                if (filterUser === 'All')
                                    return ticket.status === status;
                                if (filterUser === 'unassigned')
                                    return (
                                        ticket.status === status &&
                                        !ticket.assignedUserId
                                    );
                                return (
                                    ticket.status === status &&
                                    String(ticket.assignedUserId) === filterUser
                                );
                            });
                            // Render a Swimlane component for each status
                            return (
                                <Swimlane
                                    title={status}
                                    key={status}
                                    tickets={filteredTickets}
                                    deleteTicket={deleteIndvTicket}
                                />
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
};

export default Board;
