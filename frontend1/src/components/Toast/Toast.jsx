import { Alert, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { hideToast } from '../../app/features/alerts/alertsSlice';

const GlobalToast = () => {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector(
    (state) => state.alerts.toast,
  );

  const handleClose = () => {
    dispatch(hideToast());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity={severity} variant='filled'>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalToast;
