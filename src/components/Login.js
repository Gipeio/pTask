import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Container, Alert } from '@mui/material';
import { userLoginRequest, userLoginSuccess, userLoginFail } from '../redux/userSlice';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(userLoginRequest());
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      const data = await response.json();
      dispatch(userLoginSuccess(data));
      setErrorMessage(''); // Clear any previous error messages
    } catch (error) {
      dispatch(userLoginFail(error.message));
      setErrorMessage(error.message); // Set the error message to be displayed
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </Button>
      </form>
      <Button component="a" href="/register" color="secondary">
        Register
      </Button>
    </Container>
  );
};

export default Login;
