import { userLogout } from './userSlice';

const authMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  if (action.type === 'user/userLoginSuccess') {
    localStorage.setItem('token', action.payload.token);
  }

  if (action.type === 'user/userLogout') {
    localStorage.removeItem('token');
  }

  const token = getState().user.token;
  if (token) {
    fetch.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return next(action);
};

export default authMiddleware;
