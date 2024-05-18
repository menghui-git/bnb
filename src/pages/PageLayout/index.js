// @ts-check

import React from "react";

import { Header } from "../../common/components/header/Header";
import { Footer } from "../../common/components/Footer";
import { groups } from "../../data";

const PageLayout = ({ children }) => {
  const onSearch = (location, checkIn, checkOut, numPerson) => null;

  return (
    <>
      <Header groups={groups} onSearch={onSearch} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export { PageLayout };
