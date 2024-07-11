import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    token: localStorage.getItem('token') || null, // Récupère le token du localStorage
    loading: false,
    error: null,
  },
  reducers: {
    userLoginRequest: (state) => {
      state.loading = true;
    },
    userLoginSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token); // Stocke le token dans le localStorage
    },
    userLoginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    userLogout: (state) => {
      state.userInfo = null;
      state.token = null;
      localStorage.removeItem('token'); // Supprime le token du localStorage
    },
    userLoadFromToken: (state, action) => {
      state.userInfo = action.payload.user;
      state.token = action.payload.token;
    },
  },
});

export const {
  userLoginRequest,
  userLoginSuccess,
  userLoginFail,
  userLogout,
  userLoadFromToken,
} = userSlice.actions;

export default userSlice.reducer;
