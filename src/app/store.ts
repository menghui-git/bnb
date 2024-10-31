import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authSlice from 'app/authSlice';
import searchBarSlice from 'common/components/header/SearchBar/SearchBarSlice';
import signUpSlice from 'common/components/modals/SignUpModal/signUpSlice';
import roomListSlice from 'pages/Home/roomListSlice';
import { listenerMiddleware, reHydrateStore } from './local-store-middleware';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    rooms: roomListSlice.reducer,
    searchBar: searchBarSlice.reducer,
    signUp: signUpSlice.reducer,
  },
  preloadedState: reHydrateStore(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
