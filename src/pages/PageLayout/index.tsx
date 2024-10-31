import React, { createContext } from 'react';

import { useSelector } from 'react-redux';
import { loginAsync, setToken, setUsername } from 'app/authSlice';
import { RootState, useAppDispatch } from 'app/store';
import { categories } from 'data';
import { Footer } from '../../common/components/Footer';
import { Header } from '../../common/components/header/Header';

type ContextProps = {
  username: null | string;
  token: null | string;
  login: (username: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<ContextProps>({
  username: null,
  token: null,
  login: (username: string, password: string) => {},
  logout: () => {},
});

type Props = {
  children: React.ReactNode;
};

const PageLayout = ({ children }: Props) => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  const { token, username } = auth;

  const login = (username: string, password: string) => {
    dispatch(loginAsync({ username: username, password: '' }));
  };

  const logout = () => {
    dispatch(setToken(''));
    dispatch(setUsername(''));
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ username, token, login, logout }}>
      <Header categories={categories} />
      <main>{children}</main>
      <Footer />
    </AuthContext.Provider>
  );
};

export { PageLayout, AuthContext };
