import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import usersReducer from '../features/usersSlice';
import resultsListsReducer from '../features/resultsListSlice';
import resultReducer from '../features/resultSendSlice';
import signupReducer from '../features/signupSlice';
import loginReducer from '../features/loginSlice';
import ordersHospitalReducer from '../features/ordersSlice';
import ordersOthersReducer from '../features/ordersOtherSlice';


const rootReducer = combineReducers({
  users: usersReducer,
  resultsList: resultsListsReducer,
  ordersHospital: ordersHospitalReducer,
  ordersOthers: ordersOthersReducer,
  result: resultReducer,
  signup: signupReducer,
  login: loginReducer, //persisted
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['login'] 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);



// export const store = configureStore({
//   reducer: {
//     users: usersReducer,
//     resultsList: resultsListsReducer,
//     ordersHospital: ordersHospitalReducer,
//     ordersOthers: ordersOthersReducer,
//     result: resultReducer,
//     signup: signupReducer,
//     login: loginReducer
//   },
// });
