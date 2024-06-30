import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOrdersHospital = createAsyncThunk('ordersHospital/fetchOrdersHospital', async () => {
  const response = await axios.get('http://localhost:1234/api/v1/orders/order-hospital');
  return response.data;
});

const ordersHospitalSlice = createSlice({
  name: 'ordersHospital',
  initialState: {
    ordersHospital: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersHospital.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrdersHospital.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.ordersHospital = action.payload;
      })
      .addCase(fetchOrdersHospital.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default ordersHospitalSlice.reducer;
export const selectAllOrders = (state) => state.ordersHospital.ordersHospital;
export const selectOrdersStatus = (state) => state.ordersHospital.status;
export const selectOrdersError = (state) => state.ordersHospital.error;
