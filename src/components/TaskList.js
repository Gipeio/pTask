import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasksRequest, fetchTasksSuccess, fetchTasksFail } from '../redux/tasksSlice';
import { List, ListItem, ListItemText, CircularProgress, Button } from '@mui/material';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const loading = useSelector((state) => state.tasks.loading);
  const error = useSelector((state) => state.tasks.error);

  useEffect(() => {
    const fetchTasks = async () => {
      dispatch(fetchTasksRequest());
      try {
        const response = await fetch('/api/tasks');
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
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <List>
          {tasks.map((task) => (
            <ListItem key={task._id}>
              <ListItemText primary={task.title} secondary={task.description} />
              <Button variant="contained" color="primary">Complete</Button>
              <Button variant="contained" color="secondary">Delete</Button>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default TaskList;
