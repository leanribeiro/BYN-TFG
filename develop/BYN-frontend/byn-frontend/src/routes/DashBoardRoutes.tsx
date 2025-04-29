import { RouteObject } from "react-router-dom";
import { DashBoardEntrenador } from "../components/DashBoard/Entrenador/DashBoardEntrenador";

export const dashboardChildRoutes: RouteObject[] = [
  {
    path: "entrenador",
    element: <DashBoardEntrenador />,
  },
];
