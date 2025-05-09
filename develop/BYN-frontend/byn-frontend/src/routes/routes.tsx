import { RouteObject } from "react-router-dom";
import { Home } from "../scenes/Home";
import { Registro } from "../scenes/Registro/Registro";
import { Login } from "../scenes/Login/Login";
import { DashBoard } from "../scenes/DashboardLayout/DashBoard";
import { RutinasDashboard } from "../scenes/DashboardLayout/components/Entrenador/Rutinas/RutinasEntrenadorDash";
import RequireAuth from "../components/RequireAuth/RequireAuth";
import { DashBoardEntrenador } from "../scenes/DashboardLayout/components/Entrenador/Clientes/DashBoardEntrenador";
import { RutinasClientes } from "../scenes/DashboardLayout/components/Clientes/Rutinas/RutinasClientes";
import RoleProtectedRoute from "../components/RoleProtectedRoute";

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
            element: <RoleProtectedRoute allowedRoles={["ENTRENADOR"]} />,
            children: [
              { path: "entrenador/clientes", element: <DashBoardEntrenador /> },
              { path: "entrenador/rutinas", element: <RutinasDashboard /> },
            ],
          },
          {
            element: <RoleProtectedRoute allowedRoles={["CLIENTE"]} />,
            children: [
              { path: "cliente/rutinas", element: <RutinasClientes /> },
            ],
          },
        ],
      },
    ],
  },
];
