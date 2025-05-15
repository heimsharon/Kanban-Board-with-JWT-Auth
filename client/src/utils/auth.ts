import { jwtDecode, JwtPayload } from 'jwt-decode';


class AuthService {

    // Decode the token and return the user's profile
    getProfile(): JwtPayload | null {
        const token = this.getToken();
        if (!token) return null;

        try {
            return jwtDecode<JwtPayload>(token);
        } catch (error) {
            console.error('Error decoding token in getProfile:', error);
            return null;
        }
    }

    // Check if the user is logged in
    loggedIn(): boolean {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    // Check if the token is expired
    isTokenExpired(token: string): boolean {
        try {
            const decoded = jwtDecode<JwtPayload>(token);
            if (!decoded.exp) return true; // If no expiration field, consider it expired

            const currentTime = Date.now() / 1000; // Current time in seconds
            return decoded.exp < currentTime;
        } catch (error) {
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
