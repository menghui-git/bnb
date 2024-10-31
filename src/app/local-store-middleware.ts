import {
  ActionCreatorWithPayload,
  createListenerMiddleware,
  isAnyOf,
  Slice,
} from '@reduxjs/toolkit';
import authSlice from 'app/authSlice';
import searchBarSlice from 'common/components/header/SearchBar/SearchBarSlice';
import { AppState } from './types';

// put all the slices which access localStorage here
const cachedSlices = [authSlice, searchBarSlice];

// to get the listened slice actions for the listener middleware
const getSliceActions = (slices: Slice[]) => {
  const actions: ActionCreatorWithPayload<string, string>[] = [];
  slices.forEach((slice) => {
    actions.push(...Object.values(slice.actions));
  });

  return actions;
};

const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  matcher: isAnyOf(...getSliceActions(cachedSlices)),
  effect: (action, listenerApi) => {
    // get the slice name and state from action and listenerApi,
    // and use them as the key and value to set localStorage
    const sliceName = action.type.split('/')[0] as keyof AppState; // i.e. auth, searchBar
    const sliceState = (listenerApi.getState() as AppState)[sliceName];
    localStorage.setItem(sliceName, JSON.stringify(sliceState));
  },
});

const reHydrateStore = (): {} => {
  const localStore: Partial<AppState> = {};
  cachedSlices.forEach((slice) => {
    const state = localStorage.getItem(slice.name);
    if (state) {
      localStore[slice.name as keyof AppState] = JSON.parse(state);
    }
  });

  return localStore;
};

export { reHydrateStore, listenerMiddleware };
