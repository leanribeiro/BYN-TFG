import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import Button from "../ui/Button/Button";
import Logo_WOBG from "@/assets/icons/Logo_WOBG.png";
import Icon from "../ui/Icon/Icon";

const NavBar = () => {
  return (
    <header>
      <div className={styles.container}>
        <div>
          <Link to="/">
          <Icon src={Logo_WOBG} width={80} height={120} />
           
          </Link>
        </div>

        <nav className={styles.nav}>
          <Link to="/">Inicio</Link>
          <Link to="/#features">Características</Link>
          <Link to="/#testimonials">Testimonios</Link>
          <Link to="/#pricing">Precios</Link>
        </nav>

        <div className={styles.buttonContainer}>
            <Button size="medium">
              <Link to="/login">Iniciar sesión</Link>
            </Button>
            <Button size="medium">
              <Link to="/register">Registrarse</Link>
            </Button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
