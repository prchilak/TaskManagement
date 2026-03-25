import './App.css';

import { BrowserRouter } from 'react-router-dom';
import GlobalToast from './components/Toast/Toast';
import Router from './router/routes';
import { useEffect } from 'react';
import { initNotificationSocket } from './socket/notificationSocket';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from './app/features/auth/authSlice';

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);

  useEffect(() => {
    if (user?._id) {
      initNotificationSocket(dispatch, user._id);
    }
  }, [user, dispatch]);

  return (
    <BrowserRouter>
      <Router />
      <GlobalToast />
    </BrowserRouter>
  );
};

export default App;
