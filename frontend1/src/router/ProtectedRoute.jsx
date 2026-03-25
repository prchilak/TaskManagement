import { Navigate, useLocation } from 'react-router-dom';

import { authSelector } from '../app/features/auth/authSlice';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => authSelector(state));

  if (!isAuthenticated && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
