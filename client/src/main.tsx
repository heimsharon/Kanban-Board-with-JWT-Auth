// filepath: client/src/main.tsx
// This file sets up the main entry point for the React application, configures routing, and renders the app.
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import Board from './pages/Board.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import EditTicket from './pages/EditTicket.tsx';
import CreateTicket from './pages/CreateTicket.tsx';
import Login from './pages/Login.tsx';

// Define the application's routes using React Router
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />, // Main layout component
        errorElement: <ErrorPage />, // Fallback for routing errors
        children: [
            {
                index: true, // Default route
                element: <Board />,
            },
            {
                path: '/edit',
                element: <EditTicket />,
            },
            {
                path: '/create',
                element: <CreateTicket />,
            },
            {
                path: '/login',
                element: <Login />,
            },
        ],
    },
]);

// Find the root DOM element and render the app with the router provider
const rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
