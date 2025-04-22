import React from "react";
import Sidebar from "../../components/SideBar/SideBar";
import useAuthStore from "../../store/authStore";
import { RoutesLinksProps } from "../../types/RoutesLinks";
import { Users, ClipboardList, BarChart, MessageCircle } from "lucide-react";


export const DashBoard: React.FC = () => {
  const { user, logout } = useAuthStore();
  const clientMenu: RoutesLinksProps[] = [
    { name: "Rutinas", path: "/cliente/rutinas", icon: ClipboardList },
    { name: "Progreso", path: "/cliente/progresos", icon: BarChart },
    { name: "Mensajes", path: "/cliente/mensajes", icon: MessageCircle },
  ];
  const entrenadroMenu: RoutesLinksProps[] = [
    { name: "Clientes", path: "/entrenador/clientes", icon: Users },
    { name: "Rutinas", path: "/entrenador/rutinas", icon: ClipboardList },
    { name: "Mensajes", path: "/entrenador/mensajes", icon: MessageCircle },
  ];
  const menuItems: RoutesLinksProps[] =
    user?.role === "ENTRENADOR" ? entrenadroMenu : clientMenu;

  return <Sidebar user={user} logout={logout} menuItems={menuItems} />;
};
