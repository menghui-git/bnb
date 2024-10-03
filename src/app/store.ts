import { configureStore } from '@reduxjs/toolkit';
import roomListSlice from 'pages/Home/roomListSlice';

export const store = configureStore({
  reducer: {
    rooms: roomListSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
