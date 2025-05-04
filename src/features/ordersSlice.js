import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';
import Cookies from 'js-cookie';

export const fetchOrdersHospital = createAsyncThunk(
  'orders/fetchOrdersHospital',
  async () => {
    try {
      const healthFacility = await JSON.parse(Cookies.get('healthFacility') || '{}');
      if (!healthFacility.id) {
        throw new Error('No health facility found');
      }

      const response = await api.get('/orders', {
        params: {
          'filters[healthFacility][id][$eq]': healthFacility.id,
          'populate': '*',
          'sort': 'createdAt:desc',
        }
      });
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

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
