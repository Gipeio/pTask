import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Paper, Typography, Alert } from '@mui/material';
import { userLoginRequest, userLoginSuccess, userLoginFail } from '../redux/userSlice';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

      const responseText = await response.text(); // Lire la réponse en tant que texte
      let data;
      try {
        data = JSON.parse(responseText); // Essayer de parser le texte en JSON
      } catch (error) {
        throw new Error(responseText); // Si la réponse n'est pas du JSON, lancer une erreur avec le texte brut
      }

      if (response.ok) {
        dispatch(userLoginSuccess(data));
        navigate('/create-task');
      } else {
        dispatch(userLoginFail(data.message));
        setErrorMessage(data.message || 'Invalid credentials');
      }
    } catch (error) {
      dispatch(userLoginFail(error.message));
      setErrorMessage(error.message || 'An error occurred');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: 20, marginTop: 20 }}>
        <Typography variant="h5" align="center">Login</Typography>
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
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
