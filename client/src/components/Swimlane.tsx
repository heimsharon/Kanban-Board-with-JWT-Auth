// filepath: client/src/components/Swimlane.tsx
// This file is used to create the swimlane component

import TicketCard from './TicketCard';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';

// This interface defines the structure of the props that the Swimlane component will receive
// The Swimlane component is used to display a list of tickets in a specific status
interface SwimlaneProps {
    title: string;
    tickets: TicketData[];
    deleteTicket: (ticketId: number) => Promise<ApiMessage>;
}

// The Swimlane component is a functional component that takes in props
const Swimlane = ({ title, tickets, deleteTicket }: SwimlaneProps) => {
    // This function returns a class name based on the status of the ticket
    // The class name is used to style the swimlane
    const getStatusClass = (status: string) => {
        switch (status) {
            case 'Todo':
                return 'swim-lane todo';
            case 'In Progress':
                return 'swim-lane inprogress';
            case 'Done':
                return 'swim-lane done';
            default:
                return 'swim-lane';
        }
    };

    return (
        // The outer div uses a dynamic class name based on the swimlane status for styling
        <div className={`swimlane ${getStatusClass(title)}`}>
            {/* Display the swimlane title (status) */}
            <h2>{title}</h2>
            {/* Map through the tickets array and render a TicketCard for each ticket */}
            {tickets.map((ticket) => (
                <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    deleteTicket={deleteTicket}
                />
            ))}
        </div>
    );
};

export default Swimlane;
