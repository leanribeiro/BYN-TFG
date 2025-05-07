import React from "react";
import Sidebar from "../../components/SideBar/SideBar";
import useAuthStore from "../../store/authStore";
import { RoutesLinksProps } from "../../types/RoutesLinks";
import { Users, ClipboardList, BarChart, MessageCircle } from "lucide-react";
import styles from "./Dashboard.module.css";
import { Outlet, useNavigate } from "react-router-dom";

export const DashBoard:React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
 
  const clientMenu: RoutesLinksProps[] = [
    { name: "Rutinas", path: "/dashboard/cliente/rutinas", icon: ClipboardList },
    // { name: "Progreso", path: "/dashboard/cliente/progresos", icon: BarChart },
    // { name: "Mensajes", path: "/dashboard/cliente/mensajes", icon: MessageCircle },
  ];

  const entrenadorMenu: RoutesLinksProps[] = [
    { name: "Clientes", path: "/dashboard/entrenador/clientes", icon: Users },
    { name: "Rutinas", path: "/dashboard/entrenador/rutinas", icon: ClipboardList },
    // { name: "Mensajes", path: "/entrenador/mensajes", icon: MessageCircle },
  ];

  const menuItems: RoutesLinksProps[] =
    user?.role === "ENTRENADOR" ? entrenadorMenu : clientMenu;

  return (
    <div className={styles.dashboardLayout}>
      <Sidebar user={user} logout={handleLogout} menuItems={menuItems} />
      <main className={styles.dashboardMainContent}>
        <div className={styles.dashboardHeader}>
          <h1 className={styles.dashboardTitle}>Bienvenido, {user?.nombre}</h1>
          <p className={styles.dashboardSubtitle}>
            Aquí puedes gestionar tu información y actividades.
          </p>
        </div>
        <div className={styles.dashboardContent}>
        <Outlet context={{ user }} />
        </div>
      </main>
    </div>
  );
};
