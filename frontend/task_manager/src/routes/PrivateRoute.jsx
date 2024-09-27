import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('access_token'); // Check if the user is authenticated

    return isAuthenticated ? children : <Navigate to="/" replace />; // Redirect to home if not authenticated
};

export default PrivateRoute;

