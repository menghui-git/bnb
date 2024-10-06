import { configureStore } from '@reduxjs/toolkit';
import signUpSlice from 'common/components/modals/SignUpModal/signUpSlice';
import roomListSlice from 'pages/Home/roomListSlice';

export const store = configureStore({
  reducer: {
    rooms: roomListSlice,
    signUpData: signUpSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
