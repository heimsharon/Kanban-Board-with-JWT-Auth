// Filepath: client/src/api/authAPI.tsx
// Provides the API call for user authentication (login)
import { UserLogin, LoginResponse } from '../interfaces/UserLogin';

// Sends a POST request to the login endpoint with user credentials
// Returns user info and JWT token if successful, otherwise throws an error
const login = async (userInfo: UserLogin): Promise<LoginResponse> => {
    try {
        // Send credentials to the backend login endpoint
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo), // Send user credentials as JSON
        });

        // If the response is not successful, extract and throw the error message
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.message}`);
        }

        // Parse and return the response JSON (should contain user info and token)
        const data = await response.json();
        return data;
    } catch (err) {
        // Log and rethrow a error if the request fails
        console.error('Error from user login:', err);
        throw new Error('Could not fetch user info');
    }
};

export { login };
