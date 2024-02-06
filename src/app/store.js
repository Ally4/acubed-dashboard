import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/usersSlice';
import resultsListsReducer from '../features/resultsListSlice';
import resultReducer from '../features/resultSendSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    resultsList: resultsListsReducer,
    result: resultReducer,
  },
});
