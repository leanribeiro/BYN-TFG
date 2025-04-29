import React, { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar/SideBar";
import useAuthStore from "../../store/authStore";
import { RoutesLinksProps } from "../../types/RoutesLinks";
import { Users, ClipboardList, BarChart, MessageCircle } from "lucide-react";
import styles from "./Dashboard.module.css";
import { DashBoardEntrenador } from "../../components/DashBoard/Entrenador/DashBoardEntrenador";
import { DashBoardCliente } from "../../components/DashBoard/Clientes/DashBoardCliente";
import { Outlet } from "react-router-dom";

export const DashBoard = () => {
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
    { name: "Clientes", path: "/dashboard/entrenador/clientes", icon: Users },
    { name: "Rutinas", path: "/dashboard/entrenador/rutinas", icon: ClipboardList },
    { name: "Mensajes", path: "/entrenador/mensajes", icon: MessageCircle },
  ];

  const menuItems: RoutesLinksProps[] =
    user?.role === "ENTRENADOR" ? entrenadorMenu : clientMenu;

  return (
    <div className={styles.dashboardLayout}>
      <Sidebar user={user} logout={logout} menuItems={menuItems} />
      <main className={styles.dashboardMainContent}>
        <div className={styles.dashboardHeader}>
          <h1 className={styles.dashboardTitle}>Bienvenido, {user?.nombre}</h1>
          <p className={styles.dashboardSubtitle}>
            Aquí puedes gestionar tu información y actividades.
          </p>
        </div>
        <div className={styles.dashboardContent}>
        <Outlet context={{ user }} />
          {/* {role === "ENTRENADOR" ? (
            <DashBoardEntrenador user={user}/>
          ) : (
            <DashBoardCliente user={user}/>
          )} */}
        </div>
      </main>
    </div>
  );
};
