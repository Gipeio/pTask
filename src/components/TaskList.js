import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasksRequest, fetchTasksSuccess, fetchTasksFail, updateTask, deleteTask } from '../redux/tasksSlice';
import { List, ListItem, ListItemText, CircularProgress, Button } from '@mui/material';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const loading = useSelector((state) => state.tasks.loading);
  const error = useSelector((state) => state.tasks.error);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchTasks = async () => {
      dispatch(fetchTasksRequest());
      try {
        const response = await fetch('/api/tasks', {
          headers: {
            Authorization: `Bearer ${token}`,
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
          Authorization: `Bearer ${token}`,
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
          Authorization: `Bearer ${token}`,
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
              {task.status !== 'completed' && (
                <Button variant="contained" color="primary" onClick={() => handleComplete(task._id)}>
                  Complete
                </Button>
              )}
              <Button variant="contained" color="secondary" onClick={() => handleDelete(task._id)}>
                Delete
              </Button>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default TaskList;
