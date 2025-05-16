// filepath: client/src/components/Navbar.tsx
// Navigation bar component for the Kanban board application
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';

// Navbar component displays navigation links based on authentication status
const Navbar = () => {
    // State to track if the user is logged in
    const [loginCheck, setLoginCheck] = useState(false);

    // Checks login status and updates state
    const checkLogin = () => {
        if (auth.loggedIn()) {
            setLoginCheck(true);
        }
    };

    // Runs checkLogin whenever loginCheck changes
    useEffect(() => {
        console.log(loginCheck);
        checkLogin();
    }, [loginCheck]);

    return (
        <div className="nav">
            <div className="nav-title">
                {/* App title links to home */}
                <Link to="/">Krazy Kanban Board</Link>
            </div>
            <ul>
                {/* Conditionally render Login or Logout button based on authentication status */}
                {!loginCheck ? (
                    // If not logged in, show Login button
                    <li className="nav-item">
                        <button type="button">
                            <Link className="nav-link" to="/login">
                                Login
                            </Link>
                        </button>
                    </li>
                ) : (
                    // If logged in, show Logout button
                    <li className="nav-item">
                        <button type="button" onClick={() => auth.logout()}>
                            <Link className="nav-link" to="/">
                                Logout
                            </Link>
                        </button>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Navbar;
