import React, { useState} from "react";
import { Users, ClipboardList, MessageCircle } from "lucide-react";
import styles from "./Dashboard.module.css";
import useAuthStore from "../../../store/authStore";
import { RoutesLinksProps } from "../../../types/RoutesLinks";
import Sidebar from "../../../components/SideBar/SideBar";

export const Entrenador: React.FC = () => {
  const { user, logout } = useAuthStore();
  const [role, setRole] = useState("ENTRENADOR");



  const entrenadorMenu: RoutesLinksProps[] = [
    { name: "Clientes", path: "/entrenador/clientes", icon: Users },
    { name: "Rutinas", path: "/entrenador/rutinas", icon: ClipboardList },
    { name: "Mensajes", path: "/entrenador/mensajes", icon: MessageCircle },
  ];

  const menuItems: RoutesLinksProps[] = entrenadorMenu ;

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
            {/* <DashBoardEntrenador user={user}/>
            <div>Contenido para el cliente</div> */}
        </div>
      </main>
    </div>
  );
};
