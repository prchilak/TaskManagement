import { authSelector } from '../app/features/auth/authSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RouteNavigator = () => {
  const { isAuthenticated } = useSelector((state) => authSelector(state));
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return <>loading!!!</>;
};

export default RouteNavigator;
