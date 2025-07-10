import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/mainLayout";
import Home from "./pages/home";
import ProductPage from "./pages/Product"; 
import User from "./pages/User";
import UserPage from "./pages/UserPage"; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <Home /> },
      { path: "product/:id", element: <ProductPage /> },
      { path: "users", element: <User /> },
      { path: "user/:id", element: <UserPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
