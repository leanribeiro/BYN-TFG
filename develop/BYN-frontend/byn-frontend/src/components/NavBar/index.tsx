import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import Button from "../Button/Button";
import Logo_WOBG from "../../assets/icons/Logo_WOBG.png";
import Icon from "../Icon/Icon";
import React from "react";

export const NavBar:React.FC = () => {


  return (
    <header >
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
            <Link to="/registro">Registrarse</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

