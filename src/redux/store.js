import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import authMiddleware from './middleware';

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), authMiddleware],
});

export default store;
