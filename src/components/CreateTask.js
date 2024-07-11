import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Container } from '@mui/material';
import { createTask } from '../redux/tasksSlice';

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(createTask(data));
      } else {
        // Handle error
      }
    } catch (error) {
      // Handle error
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Create Task
        </Button>
      </form>
    </Container>
  );
};

export default CreateTask;
