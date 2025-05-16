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

const boardStates = ['Todo', 'In Progress', 'Done'];

const Board = () => {
    const [tickets, setTickets] = useState<TicketData[]>([]);
    const [users, setUsers] = useState<UserData[]>([]);
    const [error, setError] = useState(false);
    const [loginCheck, setLoginCheck] = useState(false);
    const [sortBy, setSortBy] = useState<'createdAt' | 'updatedAt' | 'name'>(
        'createdAt'
    );
    const [filterUser, setFilterUser] = useState<string>('All');

    const checkLogin = () => {
        if (auth.loggedIn()) {
            setLoginCheck(true);
        }
    };

    const fetchTickets = async () => {
        try {
            const data = await retrieveTickets(sortBy, filterUser);
            setTickets(data);
        } catch (err) {
            console.error('Failed to retrieve tickets:', err);
            setError(true);
        }
    };

    const fetchUsers = async () => {
        try {
            const data = await retrieveUsers();
            setUsers(data);
        } catch (err) {
            console.error('Failed to retrieve users:', err);
        }
    };

    const deleteIndvTicket = async (ticketId: number): Promise<ApiMessage> => {
        try {
            const data = await deleteTicket(ticketId);
            fetchTickets();
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    useLayoutEffect(() => {
        checkLogin();
    }, []);

    useEffect(() => {
        if (loginCheck) {
            fetchTickets();
            fetchUsers();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginCheck, sortBy, filterUser]);

    if (error) {
        return <ErrorPage />;
    }

    return (
        <>
            {!loginCheck ? (
                <div className="login-notice">
                    <h1>Login to create & view tickets</h1>
                </div>
            ) : (
                <div className="board">
                    <button type="button" id="create-ticket-link">
                        <Link to="/create">New Ticket</Link>
                    </button>
                    <div style={{ margin: '1em 0' }}>
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
                            {users.map((user) => (
                                <option key={user.id} value={String(user.id)}>
                                    {user.username}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="board-display">
                        {boardStates.map((status) => {
                            // Filtering by user
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
