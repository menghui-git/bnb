export type AuthState = {
  username: string;
  token: string;
};

export type RoomListState = {
  rooms: API.Room[];
  pageCount: number;
  pageIndex: number;
  totalPages: number;
};

export type SearchBarState = {
  location: string;
  checkIn: null | string;
  checkOut: null | string;
  guestData: GuestData;
};

export type SignUpState = {
  loading: boolean;
  saving: boolean;
  data: {
    fullName: string;
    email: string;
    password: string;
    password2: string;
    passwordHidden: boolean;
    passwordHidden2: boolean;
    fullNameError: string;
    emailError: string;
    passwordError: string;
    password2Error: string;
  };
};

export type AppState = {
  auth: AuthState;
  rooms: RoomListState;
  searchBar: SearchBarState;
  signUp: SignUpState;
};
