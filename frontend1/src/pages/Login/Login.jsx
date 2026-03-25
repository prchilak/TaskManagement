import {
  Alert,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { showToast } from '../../app/features/alerts/alertsSlice';
import { login as loginUser } from '../../app/features/auth/authSlice';
import Loader from '../../components/Loader/Loader';

const Login = () => {
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [validationError, setValidationError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.email || !form.password) {
      return 'All fields are required';
    }
    if (!form.email.includes('@')) {
      return 'Invalid email';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = validate();
    if (err) {
      setValidationError(err);
      return;
    }

    setValidationError('');
    const res = await dispatch(loginUser(form));

    console.log(
      '🚀 ~ handleSubmit ~ res.meta.requestStatus:',
      res.meta.requestStatus,
    );
    if (res.meta.requestStatus === 'fulfilled') {
      dispatch(
        showToast({
          message: 'Login successful',
          severity: 'success',
        }),
      );
    } else {
      dispatch(
        showToast({
          message: res.payload || 'Something went wrong',
          severity: 'error',
        }),
      );
    }
  };

  return (
    <Box display='flex' justifyContent='center' mt={10}>
      <Paper elevation={3} sx={{ p: 4, width: 350 }}>
        <Typography variant='h5' mb={2}>
          Login
        </Typography>

        {(error || validationError) && (
          <Alert severity='error' sx={{ mb: 2 }}>
            {error || validationError}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label='Email'
            name='email'
            margin='normal'
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label='Password'
            name='password'
            type='password'
            margin='normal'
            onChange={handleChange}
          />

          <Button
            fullWidth
            variant='contained'
            type='submit'
            sx={{ mt: 2 }}
            disabled={loading}
          >
            Login
          </Button>
        </form>

        {loading && <Loader />}

        <Typography mt={2}>
          Don't have an account? <Link to='/signup'>Signup</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
