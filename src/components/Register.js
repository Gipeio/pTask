import React, { useState } from 'react';
import { TextField, Button, Container, Alert } from '@mui/material';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Register Request:', { username, password });

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      console.log('Response:', response);

      if (!response.ok) {
        const errorData = await response.json();
        console.log('Error Response:', errorData);
        throw new Error(errorData.message || 'Something went wrong');
      }

      const data = await response.json();
      console.log('Success Response:', data);
      setSuccessMessage('Registration successful. You can now log in.');
      setErrorMessage('');
    } catch (error) {
      console.log('Catch Error:', error);
      setErrorMessage(error.message);
      setSuccessMessage('');
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
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </form>
      <Button component="a" href="/login" color="secondary">
        Login
      </Button>
    </Container>
  );
};

export default Register;
