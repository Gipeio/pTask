import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchTasksRequest: (state) => {
      state.loading = true;
    },
    fetchTasksSuccess: (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    },
    fetchTasksFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(task => task._id === action.payload._id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task._id !== action.payload);
    },
  },
});

export const {
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksFail,
  createTask,
  updateTask,
  deleteTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
