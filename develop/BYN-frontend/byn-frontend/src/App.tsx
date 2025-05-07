import React from "react";
import { routes } from "./routes/routes";
import { useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppRoutes = () => useRoutes(routes);

export const App: React.FC = () => {
  return (
    <>
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={4000} />
    </>
      
  );
};
