import React, { createContext, useState } from 'react';

import { Footer } from '../../common/components/Footer';
import { Header } from '../../common/components/header/Header';
import { categories } from '../../data';

type ContextProps = {
  user: null | string;

  login: (username: string) => void;
  logout: () => void;
};

const AuthContext = createContext<ContextProps>({
  user: null,
  login: (username: string) => {},
  logout: () => {},
});

type Props = {
  children: React.ReactNode;
};

const PageLayout = ({ children }: Props) => {
  const [user, setUser] = useState<null | string>(null);

  const login = (username: string) => {
    setUser(username);
  };

  const logout = () => {
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Header categories={categories} />
      <main>{children}</main>
      <Footer />
    </AuthContext.Provider>
  );
};

export { PageLayout, AuthContext };
