import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: [],
  isAuthenticated: false,
  isVerified: false,
  feedback:'',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
     login(state, action) {
      state.user = action.payload.user;
      state.feedback = action.payload.message;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.access_token);
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    checkAuth(state) {
      const token = localStorage.getItem('token');
      if (!token) {
        state.isAuthenticated = false;
      } else {
        const storedExpirationDate = localStorage.getItem('expiration');
        const expirationDate = new Date(storedExpirationDate);
        const now = new Date();
        const duration = expirationDate.getTime() - now.getTime();
        if (duration < 0) {
          state.isAuthenticated = false;
        } else {
          state.isAuthenticated = true;
        }
      }
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;