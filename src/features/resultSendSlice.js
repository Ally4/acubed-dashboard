import { createSlice } from '@reduxjs/toolkit';

const resultSlice = createSlice({
  name: 'result',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    createResultStart(state) {
      state.loading = true;
      state.error = null;
    },
    createResultSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    createResultFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { createResultStart, createResultSuccess, createResultFailure } = resultSlice.actions;

export default resultSlice.reducer;
