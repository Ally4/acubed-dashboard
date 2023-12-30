import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/usersSlice';
import resultReducer from '../features/resultSendSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    result: resultReducer,
  },
});
