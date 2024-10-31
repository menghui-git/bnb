import {
  ActionCreatorWithPayload,
  createListenerMiddleware,
  isAnyOf,
  Slice,
} from '@reduxjs/toolkit';
import authSlice from 'app/authSlice';
import searchBarSlice from 'common/components/header/SearchBar/SearchBarSlice';
import { AppState } from './appState';

// put all the slices which access localStorage here
const cachedSlices = [authSlice, searchBarSlice];

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
    const sliceName = action.type.split('/')[0];
    const cachedState = listenerApi.getState() as AppState;
    localStorage.setItem(
      sliceName,
      JSON.stringify(cachedState[sliceName as keyof AppState]),
    );
  },
});

type PartialStoreState = Partial<AppState>;

const reHydrateStore = (): {} => {
  const localStore: PartialStoreState = {};
  cachedSlices.forEach((slice) => {
    const state = localStorage.getItem(slice.name);
    if (state) {
      localStore[slice.name as keyof PartialStoreState] = JSON.parse(state);
    }
  });

  return localStore;
};

export { reHydrateStore, listenerMiddleware };
