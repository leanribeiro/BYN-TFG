import { RouteObject } from "react-router-dom";
import { Home } from "../scenes/Home";
import { Registro } from "../scenes/Register";
import { Login } from "../scenes/Login/Login";
import { DashBoard } from "../scenes/DashboardLayout/DashBoard";
import { DashBoardEntrenador } from "../components/DashBoard/Entrenador/DashBoardEntrenador";
import { RutinasDashboard } from "../components/DashBoard/Entrenador/Rutinas/RutinasEntrenadorDash";
import RequireAuth from "../components/RequireAuth/RequireAuth";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/registro",
    element: <Registro />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <RequireAuth />, // protegemos todas las rutas hijas
    children: [
      {
        path: "",
        element: <DashBoard />,
        children: [
          {
            path: "entrenador/clientes",
            element: <DashBoardEntrenador />,
          },
          {
            path: "entrenador/rutinas",
            element: <RutinasDashboard />,
          },
          {
            path: "cliente/rutinas",
            element: <div>Rutinas Cliente</div>,
          },
          {
            path: "cliente/progresos",
            element: <div>Progresos Cliente</div>,
          },
          {
            path: "cliente/mensajes",
            element: <div>Mensajes Cliente</div>,
          },
          {
            path: "entrenador/mensajes",
            element: <div>Mensajes Entrenador</div>,
          },
        ],
      },
    ],
  },
];
