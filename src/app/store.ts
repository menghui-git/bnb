import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authSlice from 'app/authSlice';
import searchBarSlice from 'common/components/header/SearchBar/SearchBarSlice';
import signUpSlice from 'common/components/modals/SignUpModal/signUpSlice';
import roomListSlice from 'pages/Home/roomListSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    rooms: roomListSlice,
    searchBar: searchBarSlice,
    signUp: signUpSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
