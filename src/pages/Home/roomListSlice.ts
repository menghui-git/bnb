import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type RoomListState = {
  rooms: API.Room[];
  pageCount: number;
  pageIndex: number;
  totalPages: number;
};

const initialState: RoomListState = {
  rooms: [],
  pageCount: 12, // TODO: get the count depending on the screen size
  pageIndex: 0,
  totalPages: 0,
};

const roomListSlice = createSlice({
  name: 'roomListData',
  initialState,
  reducers: {
    loadNewPage(state, action: PayloadAction) {
      if (state.pageIndex + 1 < state.totalPages) state.pageIndex += 1;
    },
    updateRooms(state, action: PayloadAction<API.RoomListResponse>) {
      state.totalPages = action.payload.totalPages;

      state.rooms = [...state.rooms, ...action.payload.rooms];
    },
  },
});

export const { loadNewPage, updateRooms } = roomListSlice.actions;
export default roomListSlice.reducer;
