import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.data = null
    },
    updateUserField: (state, action) => {
      const { field, value } = action.payload
      if (state.data) {
        state.data[field] = value
      }
    },

  },
});

export const { loginStart, loginSuccess, loginFailure, logout, updateUserField } = loginSlice.actions;

export default loginSlice.reducer;
