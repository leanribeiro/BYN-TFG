import { RouteObject } from "react-router-dom";
import { Home } from "../scenes/Home";
import { Registro } from "../scenes/Register";
import { Login } from "../scenes/Login/Login";

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
];
