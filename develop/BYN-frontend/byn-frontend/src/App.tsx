import React from "react";
import { routes } from "./routes/routes";
import { useRoutes } from "react-router-dom";

const AppRoutes = () => useRoutes(routes);

export const App: React.FC = () => {
  return (
      <AppRoutes />
  );
};
