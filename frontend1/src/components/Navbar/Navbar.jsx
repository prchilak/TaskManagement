import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { authSelector, logout } from '../../app/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import NotificationBell from '../NotificationBell/NotificationBell';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SendNotificationModal from '../SendNotificationModal/SendNotificationModal';
import { fetchNotifications } from '../../app/features/notifications/notificationSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openNotifModal, setOpenNotifModal] = useState(false);

  const { user } = useSelector(authSelector);
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' sx={{ flexGrow: 1 }}>
          Task Manager
        </Typography>
        {user?.role === 'admin' && (
          <Button
            color='inherit'
            startIcon={<NotificationsActiveIcon />}
            onClick={() => setOpenNotifModal(true)}
          >
            Notify
          </Button>
        )}
        <NotificationBell />

        <Button color='inherit' onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
      <SendNotificationModal
        open={openNotifModal}
        onClose={() => setOpenNotifModal(false)}
      />
    </AppBar>
  );
};

export default Navbar;
