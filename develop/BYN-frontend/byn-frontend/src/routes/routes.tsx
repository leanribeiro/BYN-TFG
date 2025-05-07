import { RouteObject } from "react-router-dom";
import { Home } from "../scenes/Home";
import { Registro } from "../scenes/Registro/Registro";
import { Login } from "../scenes/Login/Login";
import { DashBoard } from "../scenes/DashboardLayout/DashBoard";
import { RutinasDashboard } from "../components/DashBoard/Entrenador/Rutinas/RutinasEntrenadorDash";
import RequireAuth from "../components/RequireAuth/RequireAuth";
import { DashBoardEntrenador } from "../components/DashBoard/Entrenador/Clientes/DashBoardEntrenador";
import { RutinasClientes } from "../components/DashBoard/Clientes/Rutinas/RutinasClientes";

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
    element: <RequireAuth />,
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
            element: <RutinasClientes />
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
