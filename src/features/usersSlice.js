// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
//   const response = await axios.get('http://localhost:1234/api/v1/auth');
//   return response.data;
// });

// const usersSlice = createSlice({
//   name: 'users',
//   initialState: {
//     users: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUsers.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchUsers.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.users = action.payload;
//       })
//       .addCase(fetchUsers.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export default usersSlice.reducer;
// export const selectAllUsers = (state) => state.users.users;
// export const selectUsersStatus = (state) => state.users.status;

// // export { fetchPosts };







// usersSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
//   const response = await axios.get('http://localhost:1234/api/v1/auth');
//   return response.data;
// });

// export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
//   await axios.delete(`http://localhost:1234/api/v1/auth/delete/${id}`);
//   return id;
// });

// export const updateUser = createAsyncThunk('users/updateUser', async (userId) => {
//   // This is a placeholder for updating a user. You would typically pass the updated user data.
//   const response = await axios.put(`/api/users/${userId}`, { /* updated user data */ });
//   return response.data;
// });

// const usersSlice = createSlice({
//   name: 'users',
//   initialState: {
//     data: { users: [] },
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUsers.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchUsers.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.data = action.payload;
//       })
//       .addCase(fetchUsers.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(deleteUser.fulfilled, (state, action) => {
//         state.data.users = state.data.users.filter(user => user.id !== action.payload);
//       })
//       .addCase(updateUser.fulfilled, (state, action) => {
//         const updatedUser = action.payload;
//         const existingUser = state.data.users.find(user => user.id === updatedUser.id);
//         if (existingUser) {
//           Object.assign(existingUser, updatedUser);
//         }
//       });
//   },
// });

// export const selectAllUsers = (state) => state.users.data;
// export const selectUsersStatus = (state) => state.users.status;

// export default usersSlice.reducer;

















// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Fetch all users
// export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
//   const response = await axios.get('http://localhost:1234/api/v1/auth');
//   return response.data;
// });

// // Fetch a single user by ID
// export const fetchUserById = createAsyncThunk('users/fetchUserById', async (id) => {
//   const response = await axios.get(`http://localhost:1234/api/v1/auth/${id}`);
//   return response.data;
// });

// // Delete a user
// export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
//   await axios.delete(`http://localhost:1234/api/v1/auth/delete/${id}`);
//   return id;
// });

// // Update a user
// export const updateUser = createAsyncThunk('users/updateUser', async (userData) => {
//   const { id, ...updatedData } = userData;
//   const response = await axios.put(`http://localhost:1234/api/v1/auth/update/${id}`, updatedData);
//   return response.data;
// });

// const usersSlice = createSlice({
//   name: 'users',
//   initialState: {
//     data: { users: [] },
//     status: 'idle',
//     error: null,
//     userById: {},  // This will hold individual user data
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUsers.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchUsers.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.data = action.payload;
//       })
//       .addCase(fetchUsers.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(fetchUserById.fulfilled, (state, action) => {
//         const user = action.payload;
//         state.userById[user.id] = user;
//       })
//       .addCase(deleteUser.fulfilled, (state, action) => {
//         state.data.users = state.data.users.filter(user => user.id !== action.payload);
//       })
//       .addCase(updateUser.fulfilled, (state, action) => {
//         const updatedUser = action.payload;
//         const existingUser = state.data.users.find(user => user.id === updatedUser.id);
//         if (existingUser) {
//           Object.assign(existingUser, updatedUser);
//         }
//         // Also update the userById state
//         state.userById[updatedUser.id] = updatedUser;
//       });
//   },
// });

// export const selectAllUsers = (state) => state.users.data;
// export const selectUsersStatus = (state) => state.users.status;

// export default usersSlice.reducer;







// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Fetch all users
// export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
//   const response = await axios.get('http://localhost:1234/api/v1/auth');
//   return response.data;
// });

// // Fetch a single user by ID
// export const fetchUserById = createAsyncThunk('users/fetchUserById', async (id) => {
//   const response = await axios.get(`http://localhost:1234/api/v1/auth/${id}`);
//   return response.data;
// });

// // Delete a user
// export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
//   await axios.delete(`http://localhost:1234/api/v1/auth/delete/${id}`);
//   return id;
// });

// // Update a user
// export const updateUser = createAsyncThunk('users/updateUser', async (userData) => {
//   const { id, ...updatedData } = userData;
//   const response = await axios.patch(`http://localhost:1234/api/v1/auth/update-web/${id}`, updatedData);
//   return response.data;
// });

// const usersSlice = createSlice({
//   name: 'users',
//   initialState: {
//     data: { users: [] },
//     status: 'idle',
//     error: null,
//     userById: {},  // This will hold individual user data
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUsers.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchUsers.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.data = action.payload;
//       })
//       .addCase(fetchUsers.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(fetchUserById.fulfilled, (state, action) => {
//         const user = action.payload;
//         state.userById[user.id] = user;
//       })
//       .addCase(deleteUser.fulfilled, (state, action) => {
//         state.data.users = state.data.users.filter(user => user.id !== action.payload);
//       })
//       .addCase(updateUser.fulfilled, (state, action) => {
//         const updatedUser = action.payload;
//         const existingUser = state.data.users.find(user => user.id === updatedUser.id);
//         if (existingUser) {
//           Object.assign(existingUser, updatedUser);
//         }
//         // Also update the userById state
//         state.userById[updatedUser.id] = updatedUser;
//       });
//   },
// });

// export const selectAllUsers = (state) => state.users.data;
// export const selectUsersStatus = (state) => state.users.status;

// export default usersSlice.reducer;







import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch all users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('http://localhost:1234/api/v1/auth');
  return response.data;
});

// Fetch a single user by ID
export const fetchUserById = createAsyncThunk('users/fetchUserById', async (id) => {
  const response = await axios.get(`http://localhost:1234/api/v1/auth/${id}`);
  return { id, data: response.data };
});

// Delete a user
export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  await axios.delete(`http://localhost:1234/api/v1/auth/delete/${id}`);
  return id;
});

// Update a user
export const updateUser = createAsyncThunk('users/updateUser', async (userData) => {
  const { id, ...updatedData } = userData;
  const response = await axios.patch(`http://localhost:1234/api/v1/auth/update-web/${id}`, updatedData);
  return response.data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: { users: [] },
    status: 'idle',
    error: null,
    userById: {},  // This will hold individual user data
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { id, data } = action.payload;
        state.userById[id] = data;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.data.users = state.data.users.filter(user => user.id !== action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const existingUser = state.data.users.find(user => user.id === updatedUser.id);
        if (existingUser) {
          Object.assign(existingUser, updatedUser);
        }
        // Also update the userById state
        state.userById[updatedUser.id] = updatedUser;
      });
  },
});

export const selectAllUsers = (state) => state.users.data;
export const selectUsersStatus = (state) => state.users.status;

export default usersSlice.reducer;










// // usersSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
//   const response = await axios.get('/api/users');
//   return response.data;
// });

// const usersSlice = createSlice({
//   name: 'users',
//   initialState: {
//     users: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {
//     deleteUser: (state, action) => {
//       state.users = state.users.filter(user => user.id !== action.payload);
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUsers.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchUsers.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.users = action.payload;
//       })
//       .addCase(fetchUsers.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export const { deleteUser } = usersSlice.actions;
// export const selectAllUsers = (state) => state.users;
// export const selectUsersStatus = (state) => state.users.status;

// export default usersSlice.reducer;











// // usersSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
//   const response = await axios.get('http://localhost:1234/api/v1/auth');
//   return response.data;
// });

// export const fetchUserById = createAsyncThunk('users/fetchUserById', async (userId) => {
//   const response = await axios.get(`http://localhost:1234/api/v1/auth/${id}`);
//   return response.data;
// });

// export const updateUser = createAsyncThunk('users/updateUser', async (user) => {
//   const response = await axios.put(`/api/users/${user.id}`, user);
//   return response.data;
// });

// const usersSlice = createSlice({
//   name: 'users',
//   initialState: {
//     users: [],
//     user: null,
//     status: 'idle',
//     error: null,
//   },
//   reducers: {
//     deleteUser: (state, action) => {
//       state.users = state.users.filter(user => user.id !== action.payload);
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUsers.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchUsers.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.users = action.payload;
//       })
//       .addCase(fetchUsers.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
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
//         const index = state.users.findIndex(user => user.id === action.payload.id);
//         if (index !== -1) {
//           state.users[index] = action.payload;
//         }
//       })
//       .addCase(updateUser.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export const { deleteUser } = usersSlice.actions;
// export const selectAllUsers = (state) => state.users;
// export const selectUsersStatus = (state) => state.users.status;

// export default usersSlice.reducer;
