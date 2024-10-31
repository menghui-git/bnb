import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SignUpState } from 'app/types';

const initialState: SignUpState = {
  loading: false,
  saving: false,
  data: {
    fullName: '',
    email: '',
    password: '',
    password2: '',
    passwordHidden: true,
    passwordHidden2: true,
    fullNameError: '',
    emailError: '',
    passwordError: '',
    password2Error: '',
  },
};

// validators

const validateFullName = (fullName: string) => {
  if (!fullName) return 'Please enter';
  else if (fullName.length <= 3) return 'Too short';

  return '';
};

const validateEmail = (email: string) => {
  const isValidEmail = () => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
  };

  if (!email) return 'Please enter';
  else if (!isValidEmail()) return 'Invalid email';

  return '';
};

const validatePassword = (password: string) => {
  const isValidPassword = () => {
    return password.match(/^[a-zA-Z0-9]{8,}$/);
  };
  if (!password) return 'Please enter';
  else if (!isValidPassword())
    return 'Must contain 8 digits of alphabets and numbers';

  return '';
};

const validatePassword2 = (password2: string, password: string) => {
  if (!password2) return 'Please enter';
  else if (password2 !== password) return 'Wrong password';

  return '';
};

const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    setFullName(state, action: PayloadAction<string>) {
      state.data.fullName = action.payload;
      state.data.fullNameError = validateFullName(state.data.fullName);
    },
    setEmail(state, action: PayloadAction<string>) {
      state.data.email = action.payload;
      state.data.emailError = validateEmail(state.data.email);
    },
    setPassword(state, action: PayloadAction<string>) {
      state.data.password = action.payload;
      state.data.passwordError = validatePassword(state.data.password);
    },
    setPassword2(state, action: PayloadAction<string>) {
      state.data.password2 = action.payload;
      state.data.password2Error = validatePassword2(
        state.data.password2,
        state.data.password,
      );
    },
    validateAllFields(state, action: PayloadAction) {
      const data = state.data;
      data.fullNameError = validateFullName(data.fullName);
      data.emailError = validateEmail(data.email);
      data.passwordError = validatePassword(data.password);
      data.password2Error = validatePassword2(data.password2, data.password);
    },
    toggleDisplayPassword(state, action: PayloadAction) {
      state.data.passwordHidden = !state.data.passwordHidden;
    },
    toggleDisplayPassword2(state, action: PayloadAction) {
      state.data.passwordHidden2 = !state.data.passwordHidden2;
    },
    clearData(state, action: PayloadAction) {
      state.data = { ...initialState.data };
    },
  },
});

export const {
  setFullName,
  setEmail,
  setPassword,
  setPassword2,
  validateAllFields,
  toggleDisplayPassword,
  toggleDisplayPassword2,
  clearData,
} = signUpSlice.actions;
export default signUpSlice;
