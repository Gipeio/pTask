import { userLogout } from './userSlice';

const authMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  const result = next(action);
  
  if (action.type === 'user/userLoginSuccess') {
    localStorage.setItem('token', action.payload.token);
  }

  if (action.type === 'user/userLogout') {
    localStorage.removeItem('token');
  }

  return result;
};

export default authMiddleware;
