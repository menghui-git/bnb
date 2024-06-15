import React from 'react';

import { Footer } from '../../common/components/Footer';
import { Header } from '../../common/components/header/Header';
import { categories } from '../../data';

type Props = {
  children: React.ReactNode;
};

const PageLayout = ({ children }: Props) => {
  return (
    <>
      <Header categories={categories} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export { PageLayout };
