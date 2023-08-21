import { useNavigate } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';
import Spinner from '../ui/Spinner';
import classes from './ProtectedRoute.module.css';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user (Get the JSON object for the logged in user)
  const { isLoading, isAuthenticated } = useUser();

  // 2. If there is NO authenticated user, redirect to the /login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate('/login');
  }, [isAuthenticated, isLoading, navigate]);

  // 3. While loading, show a spinner
  if (isLoading) {
    return (
      <div className={classes.fullpage}>
        <Spinner />
      </div>
    );
  }

  // 4. If there IS a user, render the app
  if (isAuthenticated) {
    return children;
  }
}
