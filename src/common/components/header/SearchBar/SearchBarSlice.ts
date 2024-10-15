import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type GuestData = {
  adult: number;
  child: number;
  infant: number;
  pet: number;
};

type SearchBarState = {
  location: string;
  checkIn: null | string;
  checkOut: null | string;
  guestData: GuestData;
};

const initialState: SearchBarState = {
  location: '',
  checkIn: null,
  checkOut: null,
  guestData: {
    adult: 0,
    child: 0,
    infant: 0,
    pet: 0,
  },
};

const searchBarSlice = createSlice({
  name: 'searchBar',
  initialState,
  reducers: {
    setLocation(state, action: PayloadAction<string>) {
      state.location = action.payload;
    },
    setCheckDates(state, action: PayloadAction<string>) {
      const date = action.payload;

      if (!state.checkIn) {
        state.checkIn = date;
      } else if (date! < state.checkIn) {
        state.checkIn = date;
        state.checkOut = null;
      } else {
        state.checkOut = date;
      }
    },
    setGuestData(state, action: PayloadAction<GuestData>) {
      state.guestData = action.payload;
    },
  },
});

export const { setLocation, setCheckDates, setGuestData } =
  searchBarSlice.actions;
export default searchBarSlice.reducer;
