// @ts-check

import React from 'react';

import { Footer } from '../../common/components/Footer';
import { Header } from '../../common/components/header/Header';
import { categories } from '../../data';

const PageLayout = ({ children }) => {
  const onSearch = (location, checkIn, checkOut, numPerson) => null;

  return (
    <>
      <Header categories={categories} onSearch={onSearch} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export { PageLayout };
