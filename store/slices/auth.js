import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  auth: {
    user: null,
    token: null,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.auth.user = action.payload;
    },
    setToken: (state, action) => {
      state.auth.token = action.payload;
    },
  },
});

export const { setUser, setToken } = authSlice.actions;

export default authSlice.reducer;