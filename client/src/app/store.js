import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/usersSlice';
import resultsListsReducer from '../features/resultsListSlice';
import resultReducer from '../features/resultSendSlice';
import signupReducer from '../features/signupSlice';
import loginReducer from '../features/loginSlice';
import ordersHospitalReducer from '../features/ordersSlice';
import ordersOthersReducer from '../features/ordersOtherSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    resultsList: resultsListsReducer,
    ordersHospital: ordersHospitalReducer,
    ordersOthers: ordersOthersReducer,
    result: resultReducer,
    signup: signupReducer,
    login: loginReducer
  },
});
