import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasksRequest, fetchTasksSuccess, fetchTasksFail, updateTask, deleteTask } from '../redux/tasksSlice';
import { List, ListItem, ListItemText, CircularProgress, Button, Typography, Grid, Paper, Container } from '@mui/material';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const loading = useSelector((state) => state.tasks.loading);
  const error = useSelector((state) => state.tasks.error);
  const token = useSelector((state) => state.user.token); // Récupère le token depuis le state Redux

  useEffect(() => {
    const fetchTasks = async () => {
      dispatch(fetchTasksRequest());
      try {
        const response = await fetch('/api/tasks', {
          headers: {
            'Authorization': `Bearer ${token}`, // Ajoute le token dans l'en-tête Authorization
          },
        });
        const data = await response.json();
        if (response.ok) {
          dispatch(fetchTasksSuccess(data));
        } else {
          dispatch(fetchTasksFail(data.message));
        }
      } catch (error) {
        dispatch(fetchTasksFail(error.message));
      }
    };

    fetchTasks();
  }, [dispatch, token]);

  const handleComplete = async (id) => {
    try {
      const response = await fetch(`/api/tasks/${id}/complete`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Ajoute le token dans l'en-tête Authorization
        },
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(updateTask(data));
      } else {
        // Handle error
      }
    } catch (error) {
      // Handle error
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, // Ajoute le token dans l'en-tête Authorization
        },
      });
      if (response.ok) {
        dispatch(deleteTask(id));
      } else {
        // Handle error
      }
    } catch (error) {
      // Handle error
    }
  };

  return (
    <Container maxWidth="md">
      <Paper style={{ padding: 20, marginTop: 20 }}>
        <Typography variant="h5" align="center">Task List</Typography>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">Error: {error}</Typography>
        ) : (
          <List>
            {tasks.map((task) => (
              <ListItem key={task._id} divider>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6">{task.title}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">{task.description}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      Status: {task.status}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} container justifyContent="space-between">
                    {task.status !== 'completed' && (
                      <Button variant="contained" color="primary" onClick={() => handleComplete(task._id)}>
                        Complete
                      </Button>
                    )}
                    <Button variant="contained" color="secondary" onClick={() => handleDelete(task._id)}>
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
};

export default TaskList;
