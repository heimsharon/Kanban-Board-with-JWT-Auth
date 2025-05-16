// filepath: client/src/api/userAPI.tsx
// This file contains the API calls for user management
import Auth from '../utils/auth';

// This function retrieves all users from the server
const retrieveUsers = async () => {
    try {
        // Fetch users from the server
        // The URL is constructed with the base URL and the query string
        const response = await fetch('/api/users', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`,
            },
        });

        // Check if the response is ok (status in the range 200-299)
        const data = await response.json();
        // If the response is ok, parse the JSON data and return it
        if (!response.ok) {
            // If the response is not ok, throw an error with the message from the server
            throw new Error('invalid user API response, check network tab!');
        }
        // The data is expected to be an array of user objects
        // Return the array of user data
        return data;
    } catch (err) {
        // If an error occurs during the fetch, log the error and return an empty array, fallback to ensure the application does not crash
        console.error(`Error during login to /api/users:`, err);
        return [];
    }
};

export { retrieveUsers };
