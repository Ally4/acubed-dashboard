import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/postsSlices';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});
