import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

import { createNotification } from '../../app/features/notifications/notificationSlice';
import { showToast } from '../../app/features/alerts/alertsSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const SendNotificationModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) {
      dispatch(
        showToast({
          message: 'Title is required',
          severity: 'error',
        }),
      );
      return;
    }
    if (!message.trim()) {
      dispatch(
        showToast({
          message: 'Message is required',
          severity: 'error',
        }),
      );
      return;
    }

    const res = await dispatch(createNotification({ title, message }));

    if (res.meta.requestStatus === 'fulfilled') {
      dispatch(
        showToast({
          message: 'Notification sent successfully',
          severity: 'success',
        }),
      );

      setTitle('');
      setMessage('');
      onClose();
    } else {
      dispatch(
        showToast({
          message: res.payload,
          severity: 'error',
        }),
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>Send Notification</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          label='Title'
          margin='normal'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          fullWidth
          label='Message'
          multiline
          rows={3}
          margin='normal'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button variant='contained' onClick={handleSubmit} disabled={loading}>
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SendNotificationModal;
