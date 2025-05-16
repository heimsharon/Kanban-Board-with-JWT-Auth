// filepath: client/src/utils/auth.ts
// This file contains the AuthService class for handling JWT authentication
import { jwtDecode, JwtPayload } from 'jwt-decode';
class AuthService {
    // Decode the token and return the user's profile
    getProfile(): JwtPayload | null {
        // Retrieve the token from localStorage
        const token = this.getToken();
        // If no token is found, return null
        // The token is expected to be a JWT string
        if (!token) return null;

        try {
            // Decode the token using jwt-decode library
            return jwtDecode<JwtPayload>(token);
        } catch (error) {
            // If there's an error decoding the token, log it to the console
            // and return null
            console.error('Error decoding token in getProfile:', error);
            return null;
        }
    }

    // Check if the user is logged in
    loggedIn(): boolean {
        // Check if the token exists and is not expired
        // The token is expected to be a JWT string
        const token = this.getToken();
        // If the token is not found, return false
        // If the token is found, check if it is expired
        return !!token && !this.isTokenExpired(token);
    }

    // Check if the token is expired
    isTokenExpired(token: string): boolean {
        try {
            // Decode the token using jwt-decode library
            // The token is expected to be a JWT string
            const decoded = jwtDecode<JwtPayload>(token);
            // Check if the token has an expiration time (exp)
            // If the token does not have an expiration time, return true
            if (!decoded.exp) return true;
            // Check if the token is expired
            // The expiration time is in seconds, so divide by 1000 to get seconds
            const currentTime = Date.now() / 1000;
            // Compare the expiration time with the current time
            // If the expiration time is less than the current time, return true
            return decoded.exp < currentTime;
        } catch (error) {
            // If there's an error decoding the token, log it to the console
            console.error(
                'Error checking token expiration in isTokenExpired:',
                error
            );
            return true; // If there's an error, assume the token is expired
        }
    }

    // Retrieve the token from localStorage
    getToken(): string {
        return localStorage.getItem('id_token') || '';
    }

    // Save the token to localStorage and redirect to the home page
    login(idToken: string): void {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    // Remove the token from localStorage and redirect to the login page
    logout(): void {
        localStorage.removeItem('id_token');
        window.location.assign('/login');
    }
}

export default new AuthService();
