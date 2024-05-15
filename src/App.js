import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import { PageLayout } from "./pages/PageLayout";
import { HomePage } from "./pages/Home";
import { RoomDetail } from "./pages/RoomDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PageLayout>
        <HomePage />
      </PageLayout>
    ),
  },
  {
    path: "/room/:roomId",
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
