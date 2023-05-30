import { configureStore } from '@reduxjs/toolkit';
import authSlice  from './auth.slice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    // chat: chatReducer,
    // user: userReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;