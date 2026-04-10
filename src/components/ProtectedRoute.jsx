import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  // If the user is not logged in, redirect them to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If they are logged in, render the page they requested (the children)
  return children;
}

export default ProtectedRoute;