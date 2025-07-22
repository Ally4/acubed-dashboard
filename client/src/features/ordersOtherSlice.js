// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const fetchOrdersOthers = createAsyncThunk('ordersOthers/fetchOrdersOthers', async () => {
//   const response = await axios.get('http://localhost:1234/api/v1/orders/order-Others');
//   return response.data;
// });

// const ordersOthersSlice = createSlice({
//   name: 'ordersOthers',
//   initialState: {
//     ordersOthers: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchOrdersOthers.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchOrdersOthers.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.ordersOthers = action.payload;
//       })
//       .addCase(fetchOrdersOthers.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export default ordersOthersSlice.reducer;
// export const selectAllOrders = (state) => state.ordersOthers.ordersOthers;
// export const selectOrdersStatus = (state) => state.ordersOthers.status;
// export const selectOrdersError = (state) => state.ordersOthers.error;







import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../config';

export const fetchOrdersOthers = createAsyncThunk('ordersOthers/fetchOrdersOthers', async () => {
  const response = await axios.get(`${API_URL}/orders?populate=*`);
  return response.data;
});

const ordersOthersSlice = createSlice({
  name: 'ordersOthers',
  initialState: {
    ordersOthers: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersOthers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrdersOthers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.ordersOthers = action.payload;
      })
      .addCase(fetchOrdersOthers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default ordersOthersSlice.reducer;
export const selectAllOrders = (state) => state.ordersOthers.ordersOthers;
export const selectOrdersStatus = (state) => state.ordersOthers.status;
export const selectOrdersError = (state) => state.ordersOthers.error;
