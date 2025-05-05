import { Link, useLocation } from "react-router-dom";
import { Settings, LogOut } from "lucide-react";
import Logo_WOBG from "@/assets/icons/Logo_WOBG.png";

import styles from "./SideBar.module.css";
import Icon from "../Icon/Icon";
import { SideBarProps } from "./types";
import Button from "../Button/Button";

const Sidebar:React.FC<SideBarProps> = (props) => {
    const { user ,logout, menuItems} = props;


    const location = useLocation();
 
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };


  return (
    <div className={styles.sidebar}>
      <div className={styles.logoWrapper}>
        <Link to="/">
          <Icon src={Logo_WOBG} width={80} height={120} />
        </Link>
        <span className={styles.span}>Be Your Next</span>
      </div>

      <div className="px-4 mb-6">
        <div className={styles.userCard}>
          <h3 className={styles.userName}>{user?.nombre}</h3>
          <p className={styles.userRole}>
            {user?.role === "ENTRENADOR" ? "ENTRENADOR" : "CLIENTE"}
          </p>
        </div>
      </div>

      <nav className="flex-grow">
        <ul className={styles.navList}>
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`${styles.navItem} ${
                  isActive(item.path) ? styles.active : ""
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.footer}>
        <ul>
          <li>
            <Link to="/settings" className={styles.buttonLink}>
              <Settings className="h-5 w-5" />
              <span>Configuración</span>
            </Link>
          </li>
          <li>
            <Button onClick={logout}>
              <LogOut className="h-5 w-5" />
              <span>Cerrar sesión</span>
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
