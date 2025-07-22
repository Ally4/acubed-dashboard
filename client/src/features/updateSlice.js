// // usersSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Fetch user by ID
// export const fetchUserById = createAsyncThunk('users/fetchUserById', async (id) => {
//   const response = await axios.get(`http://localhost:1234/api/v1/auth/user/${id}`);
//   return response.data;
// });

// // Update user
// export const updateUser = createAsyncThunk('users/updateUser', async (user) => {
//   const response = await axios.put(`http://localhost:1234/api/v1/auth/update-web/${user.id}`, user);
//   return response.data;
// });

// const usersSlice = createSlice({
//   name: 'users',
//   initialState: {
//     user: null,
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUserById.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchUserById.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.user = action.payload;
//       })
//       .addCase(fetchUserById.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(updateUser.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(updateUser.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.user = action.payload;
//       })
//       .addCase(updateUser.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export const selectUsersStatus = (state) => state.users.status;

// export default usersSlice.reducer;






// usersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch user by ID
export const fetchUserById = createAsyncThunk('users/fetchUserById', async (id) => {
  const response = await axios.get(`${process.env('API_URL')}/auth/user/${id}`);
  return response.data;
});

// Update user
export const updateUser = createAsyncThunk('users/updateUser', async (user) => {
  console.log('Updating user with data:', user, "==========");
  const response = await axios.put(`${process.env('API_URL')}/auth/update-web/${user.id}`, user);
  return response.data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectUsersStatus = (state) => state.users.status;

export default usersSlice.reducer;
