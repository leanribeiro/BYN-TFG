import { RouteObject } from "react-router-dom";
import { DashBoardEntrenador } from "../scenes/DashBoard/Entrenador/DashBoardEntrenador";

export const dashboardChildRoutes: RouteObject[] = [
//   {
//     path: "clientes",
//     element: <Clientes />,
//   },
  {
    path: "entrenador",
    element: <DashBoardEntrenador />,
  },
];
