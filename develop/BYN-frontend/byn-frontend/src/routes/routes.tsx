import { RouteObject } from "react-router-dom";
import { Home } from "../scenes/Home";
import { Registro } from "../scenes/Register";
import { Login } from "../scenes/Login/Login";
import { DashBoard } from "../scenes/DashboardLayout/DashBoard";
import { dashboardChildRoutes } from "./DashBoardRoutes";

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
    element: <DashBoard  />,
    // children: dashboardChildRoutes,
  },

];
