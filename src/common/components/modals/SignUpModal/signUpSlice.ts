import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SignUpState = {
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

const initialState: SignUpState = {
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
  name: 'signUpData',
  initialState,
  reducers: {
    inputFullName(state, action: PayloadAction<string>) {
      state.fullName = action.payload;
      state.fullNameError = validateFullName(state.fullName);
    },
    inputEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
      state.emailError = validateEmail(state.email);
    },
    inputPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
      state.passwordError = validatePassword(state.password);
    },
    inputPassword2(state, action: PayloadAction<string>) {
      state.password2 = action.payload;
      state.password2Error = validatePassword2(state.password2, state.password);
    },
    validateAllFields(state, action: PayloadAction) {
      state.fullNameError = validateFullName(state.fullName);
      state.emailError = validateEmail(state.email);
      state.passwordError = validatePassword(state.password);
      state.password2Error = validatePassword2(state.password2, state.password);
    },
    onHidePasswodClick(state, action: PayloadAction) {
      state.passwordHidden = !state.passwordHidden;
    },
    onHidePasswod2Click(state, action: PayloadAction) {
      state.passwordHidden2 = !state.passwordHidden2;
    },
    clearData(state, action: PayloadAction) {
      state.fullName = '';
      state.email = '';
      state.password = '';
      state.password2 = '';
      state.passwordHidden = true;
      state.passwordHidden2 = true;
      state.fullNameError = '';
      state.emailError = '';
      state.passwordError = '';
      state.password2Error = '';
    },
  },
});

export const {
  inputFullName,
  inputEmail,
  inputPassword,
  inputPassword2,
  validateAllFields,
  onHidePasswodClick,
  onHidePasswod2Click,
  clearData,
} = signUpSlice.actions;
export default signUpSlice.reducer;
