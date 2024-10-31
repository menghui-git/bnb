import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { login, signUp } from 'data';
import { AuthState } from './appState';

const initialState: AuthState = {
  // TODO: handle loading
  username: '',
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
  },
});

const { setToken, setUsername } = authSlice.actions;

const loginAsync = createAsyncThunk(
  'login',
  async ({ username, password }: API.LoginData, thunkAPI) => {
    const response = await login(username, password);

    thunkAPI.dispatch(setToken(response.token));
    thunkAPI.dispatch(setUsername(username));
  },
);

const signUpAsync = createAsyncThunk(
  'signUp',
  async (
    { username, email, password, password2 }: API.SignUpData,
    thunkAPI,
  ) => {
    const response = await signUp(username, email, password, password2);
  },
);

export { loginAsync, signUpAsync, setToken, setUsername };
export default authSlice;
