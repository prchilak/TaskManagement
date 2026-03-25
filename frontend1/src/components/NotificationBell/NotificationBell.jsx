import {
  Badge,
  Box,
  CircularProgress,
  IconButton,
  Menu,
  Typography,
} from '@mui/material';
import {
  fetchNotifications,
  markAsRead,
} from '../../app/features/notifications/notificationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import NotificationsIcon from '@mui/icons-material/Notifications';

const NotificationBell = () => {
  const dispatch = useDispatch();

  const { list, unreadCount, page, hasMore, loading } = useSelector(
    (state) => state.notifications,
  );

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  useEffect(() => {
    if (open && list.length === 0) {
      dispatch(fetchNotifications(1));
    }
  }, [open, dispatch]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;

    const isNearBottom = scrollHeight - scrollTop <= clientHeight + 50;

    if (isNearBottom && hasMore && !loading) {
      dispatch(fetchNotifications(page));
    }
  };

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <Badge
          badgeContent={unreadCount > 0 ? unreadCount : null}
          color='error'
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        <Box
          sx={{ width: 300, maxHeight: 400, overflowY: 'auto' }}
          onScroll={handleScroll}
        >
          <Typography px={2} py={1} sx={{ fontWeight: 600 }}>
            Notifications
          </Typography>
          {!loading && list.length === 0 && (
            <Typography px={2} py={1}>
              No notifications
            </Typography>
          )}
          {list.map((n) => (
            <Box
              key={n._id}
              px={2}
              py={1}
              onClick={() => dispatch(markAsRead(n._id))}
              sx={{
                cursor: 'pointer',
                fontWeight: n.isRead ? 'normal' : 'bold',
                borderBottom: '1px solid #eee',
              }}
            >
              {n.message}
            </Box>
          ))}

          {loading && (
            <Box textAlign='center' py={1}>
              <CircularProgress size={20} />
            </Box>
          )}
        </Box>
      </Menu>
    </>
  );
};

export default NotificationBell;
