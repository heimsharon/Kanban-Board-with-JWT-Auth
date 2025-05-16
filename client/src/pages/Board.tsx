import { useEffect, useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { retrieveTickets, deleteTicket } from '../api/ticketAPI';
import ErrorPage from './ErrorPage';
import Swimlane from '../components/Swimlane';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';
import auth from '../utils/auth';

const boardStates = ['Todo', 'In Progress', 'Done'];

const Board = () => {
    const [tickets, setTickets] = useState<TicketData[]>([]);
    const [error, setError] = useState(false);
    const [loginCheck, setLoginCheck] = useState(false);
    const [sortBy, setSortBy] = useState<'createdAt' | 'name' | 'status'>(
        'createdAt'
    );

    const checkLogin = () => {
        if (auth.loggedIn()) {
            setLoginCheck(true);
        }
    };

    const fetchTickets = async () => {
        try {
            const data = await retrieveTickets(sortBy);
            setTickets(data);
        } catch (err) {
            console.error('Failed to retrieve tickets:', err);
            setError(true);
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
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginCheck, sortBy]);

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
                                        | 'name'
                                        | 'status'
                                )
                            }
                        >
                            <option value="createdAt">Created At</option>
                            <option value="name">Name</option>
                            <option value="status">Status</option>
                        </select>
                    </div>
                    <div className="board-display">
                        {boardStates.map((status) => {
                            const filteredTickets = tickets.filter(
                                (ticket) => ticket.status === status
                            );
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
