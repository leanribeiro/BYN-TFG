import React, { useState, useEffect } from "react";
import Sidebar from "../SideBar/SideBar";
import useAuthStore from "../../store/authStore";
import { RoutesLinksProps } from "../../types/RoutesLinks";
import { Users, ClipboardList, BarChart, MessageCircle } from "lucide-react";
import styles from "./Dashboard.module.css";
import { DashBoardEntrenador } from "../../scenes/DashBoard/Entrenador/DashBoardEntrenador";

export const Dashboard = () => {
  const { user, logout } = useAuthStore();
  const [role, setRole] = useState("ENTRENADOR");

  useEffect(() => {
    if (user?.role === "ENTRENADOR") {
      setRole("ENTRENADOR");
    } else {
      setRole("CLIENTE");
    }
  }, [user]);

  const clientMenu: RoutesLinksProps[] = [
    { name: "Rutinas", path: "/cliente/rutinas", icon: ClipboardList },
    { name: "Progreso", path: "/cliente/progresos", icon: BarChart },
    { name: "Mensajes", path: "/cliente/mensajes", icon: MessageCircle },
  ];

  const entrenadorMenu: RoutesLinksProps[] = [
    { name: "Clientes", path: "/entrenador/clientes", icon: Users },
    { name: "Rutinas", path: "/entrenador/rutinas", icon: ClipboardList },
    { name: "Mensajes", path: "/entrenador/mensajes", icon: MessageCircle },
  ];

  const menuItems: RoutesLinksProps[] =
    user?.role === "ENTRENADOR" ? entrenadorMenu : clientMenu;

  return (
    <div className={styles.dashboardLayout}>
      <Sidebar user={user} logout={logout} menuItems={menuItems} />
      <main className={styles.dashboardMainContent}>
        <div className={styles.dashboardHeader}>
          <h1 className={styles.dashboardTitle}>Bienvenido, {user?.name}</h1>
          <p className={styles.dashboardSubtitle}>
            Aquí puedes gestionar tu información y actividades.
          </p>
        </div>
        <div className={styles.dashboardContent}>
          {role === "ENTRENADOR" ? (
            <DashBoardEntrenador user={user}/>
          ) : (
            <div>Contenido para el cliente</div>
          )}
        </div>
      </main>
    </div>
  );
};
