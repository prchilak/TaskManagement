import { Navigate, useLocation } from 'react-router-dom';

import { authSelector } from '../app/features/auth/authSlice';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => authSelector(state));

  if (isAuthenticated) {
    return <Navigate to='/dashboard' state={{ from: location }} />;
  }

  return children;
};

export default PublicRoute;
