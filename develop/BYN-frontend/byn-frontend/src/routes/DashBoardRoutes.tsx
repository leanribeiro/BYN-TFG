import { RouteObject } from "react-router-dom";
import { DashBoardEntrenador } from "../scenes/DashboardLayout/components/Entrenador/DashBoardEntrenador";

export const dashboardChildRoutes: RouteObject[] = [
  {
    path: "entrenador",
    element: <DashBoardEntrenador />,
  },
];
