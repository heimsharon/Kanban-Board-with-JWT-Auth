// Filepath: client/src/api/ticketAPI.tsx
// This file contains the API calls for ticket management
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';
import Auth from '../utils/auth';

// This function retrieves all tickets from the server
const retrieveTickets = async (sortBy = 'createdAt', filterUser = 'All') => {
    try {
        // Build query parameters for sorting and filtering tickets
        const params = new URLSearchParams({ sortBy });
        if (filterUser && filterUser !== 'All')
            params.append('userId', filterUser);

        // Fetch tickets from the server with the specified query parameters
        // The URL is constructed with the base URL and the query string
        const response = await fetch(`/api/tickets?${params.toString()}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`,
            },
        });

        // Check if the response is ok (status code 200-299)
        const data = await response.json();
        // If the response is ok, parse the JSON data and return it
        if (!response.ok) {
            // If the response is not ok, throw an error
            throw new Error('invalid API response, check network tab!');
        }

        // The data is expected to be an array of TicketData objects
        // Return the array of ticket data
        return data;
    } catch (err) {
        // If an error occurs during the fetch, log the error and return an empty array
        console.log('Error from data retrieval: ', err);
        return [];
    }
};

// This function retrieves a single ticket by its ID from the server
const retrieveTicket = async (id: number | null): Promise<TicketData> => {
    try {
        // Check if the ID is null or number
        const response = await fetch(`/api/tickets/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`,
            },
        });

        const data = await response.json(); // Parse the JSON data from the response

        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
            // If the response is not ok, throw an error
            throw new Error(
                'Could not invalid API response, check network tab!'
            );
        }
        // The data is expected to be a TicketData object
        // Return the ticket data
        return data;
    } catch (err) {
        // If an error occurs during the fetch, log the error and return a rejected promise
        console.log('Error from data retrieval: ', err);
        return Promise.reject('Could not fetch singular ticket');
    }
};

// This function creates a new ticket on the server
const createTicket = async (body: TicketData) => {
    try {
        // Send a POST request to the server to create a new ticket
        // The request body contains the ticket data in JSON format
        const response = await fetch('/api/tickets/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`,
            },
            body: JSON.stringify(body), // Convert the body to JSON format
        });
        // Parse the JSON data from the response
        const data = response.json();
        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
            // If the response is not ok, throw an error
            throw new Error('invalid API response, check network tab!');
        }
        // The data is expected to be a TicketData object
        // Return the created ticket data
        return data;
    } catch (err) {
        // If an error occurs during the fetch, log the error and return a rejected promise
        console.log('Error from Ticket Creation: ', err);
        return Promise.reject('Could not create ticket');
    }
};

// This function updates an existing ticket on the server
const updateTicket = async (
    ticketId: number,
    body: TicketData
): Promise<TicketData> => {
    try {
        // Send a PUT request to the server to update the ticket
        // The request body contains the updated ticket data in JSON format
        const response = await fetch(`/api/tickets/${ticketId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`,
            },
            body: JSON.stringify(body), // Convert the body to JSON format
        });
        const data = await response.json(); // Parse the JSON data from the response

        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
            // If the response is not ok, throw an error
            throw new Error('invalid API response, check network tab!');
        }
        // The data is expected to be a TicketData object
        // Return the updated ticket data
        return data;
    } catch (err) {
        // If an error occurs during the fetch, log the error and return a rejected promise
        console.error('Update did not work', err);
        return Promise.reject('Update did not work');
    }
};
// This function deletes a ticket by its ID from the server
const deleteTicket = async (ticketId: number): Promise<ApiMessage> => {
    try {
        // Send a DELETE request to the server to delete the ticket
        const response = await fetch(`/api/tickets/${ticketId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`,
            },
        });
        const data = await response.json(); // Parse the JSON data from the response

        // Check if the response is ok (status code 200-299)
        // If the response is not ok, throw an error
        if (!response.ok) {
            throw new Error('invalid API response, check network tab!');
        }
        // The data is expected to be an ApiMessage object
        // Return the API message data
        return data;
    } catch (err) {
        // If an error occurs during the fetch, log the error and return a rejected promise
        console.error('Error in deleting ticket', err);
        return Promise.reject('Could not delete ticket');
    }
};
// Export the functions for use in other parts of the application
export {
    createTicket,
    deleteTicket,
    retrieveTickets,
    retrieveTicket,
    updateTicket,
};
