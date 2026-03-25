import {
  Alert,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../components/Loader/Loader';
import { showToast } from '../../app/features/alerts/alertsSlice';
import { signup as signupUser } from '../../app/features/auth/authSlice';
import { useState } from 'react';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [validationError, setValidationError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name || !form.email || !form.password) {
      return 'All fields are required';
    }
    if (form.password.length < 6) {
      return 'Password must be at least 6 characters';
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
    const res = await dispatch(signupUser(form));

    if (res.meta.requestStatus === 'fulfilled') {
      dispatch(
        showToast({
          message: 'Signup successful',
          severity: 'success',
        }),
      );

      navigate('/');
    } else {
      dispatch(
        showToast({
          message:
            res.payload?.message || res.payload || 'Something went wrong',
          severity: 'error',
        }),
      );
    }
  };

  return (
    <Box display='flex' justifyContent='center' mt={10}>
      <Paper elevation={3} sx={{ p: 4, width: 350 }}>
        <Typography variant='h5' mb={2}>
          Signup
        </Typography>

        {(error || validationError) && (
          <Alert severity='error' sx={{ mb: 2 }}>
            {error || validationError}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label='Name'
            name='name'
            margin='normal'
            onChange={handleChange}
          />

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
            Signup
          </Button>
        </form>

        {loading && <Loader />}

        <Typography mt={2}>
          Already have an account? <Link to='/'>Login</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Signup;
