import { combineReducers } from 'redux';
import userReducer from './userSlice';
import tasksReducer from './tasksSlice';

const rootReducer = combineReducers({
  user: userReducer,
  tasks: tasksReducer,
});

export default rootReducer;
