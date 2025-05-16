// Filepath: client/src/pages/Login.tsx
// This file is used to create the login component
import { useState, FormEvent, ChangeEvent } from 'react';
import Auth from '../utils/auth';
import { login } from '../api/authAPI';

// Main component for the login form
const Login = () => {
    // The initial state is set to an object with empty strings for username and password
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    });

    // State for error messages to display to the user
    const [error, setError] = useState<string | null>(null);

    // This function handles the change event for the input fields
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        // Destructuring the name and value from the event target
        // The name corresponds to the input field name and value is the input value
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    };
    // This function handles the form submission
    const handleSubmit = async (e: FormEvent) => {
        // Prevent the default form submission behavior
        e.preventDefault();
        try {
            // Call the login function from the authAPI and pass the loginData
            const data = await login(loginData);
            // If the login is successful, the token is returned and stored in local storage
            // The Auth utility is used to manage authentication
            Auth.login(data.token);
            // Clear any previous error message
            setError(null);
        } catch (err) {
            // If there is an error, it is logged to the console
            console.error('Failed to login', err);
            // Error message to display to the user
            setError('Invalid username or password. Please try again.');
        }
    };

    return (
        <div className="container">
            <form className="form" onSubmit={handleSubmit}>
                <h1>Login</h1>
                {/* Display error message if login fails */}
                {error && <div className="error-message">{error}</div>}
                <label>Username</label>
                <input
                    type="text"
                    name="username"
                    value={loginData.username || ''}
                    onChange={handleChange}
                />
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={loginData.password || ''}
                    onChange={handleChange}
                />
                <button type="submit">Submit Form</button>
            </form>
        </div>
    );
};

export default Login;
