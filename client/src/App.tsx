// Filepath: client/src/App.tsx
// This file is used to create the main App component
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

// The main App component serves as the layout for the application
function App() {
    return (
        // The outer container for the app
        <div className="container">
            {/* The navigation bar is displayed at the top of every page */}
            <Navbar />
            <main>
                {/* The Outlet renders the matched child route component */}
                <Outlet />
            </main>
        </div>
    );
}

export default App;
