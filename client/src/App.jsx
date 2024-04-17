import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomePage from './pages/HomePage';
import { AuthRoutes } from './routes/AuthRoutes';
import { AdminRoutes } from './routes/AdminRoutes';
import { OfficersRoutes } from './routes/OfficersRoutes';
import { CitizensRoutes } from './routes/CitizensRoutes';

const router = createBrowserRouter([
  // global routes
  {
    path: "/",
    element: <HomePage />,
  },

  // protected routes
  AuthRoutes,
  AdminRoutes,
  OfficersRoutes,
  CitizensRoutes,
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
