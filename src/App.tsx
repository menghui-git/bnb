// @ts-check

import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.scss';
import { HomePage } from './pages/Home';
import { PageLayout } from './pages/PageLayout';
import { RoomDetail } from './pages/RoomDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PageLayout>
        <HomePage />
      </PageLayout>
    ),
  },
  {
    path: '/room/:roomId',
    element: (
      <PageLayout>
        <RoomDetail />,
      </PageLayout>
    ),
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
