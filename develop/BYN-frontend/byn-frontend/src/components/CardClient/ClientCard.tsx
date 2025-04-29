import { Link } from "react-router-dom";
import styles from "./ClientCard.module.css";
import { ClientCardProps } from "./types";


export const ClientCard: React.FC<ClientCardProps> = ({ id, nombre, email }) => {
  const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(nombre)}&backgroundColor=b6e3f4`;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <img src={avatarUrl} alt={nombre} className={styles.avatar} />
        <div className={styles.info}>
          <h3 className={styles.name}>{nombre}</h3>
          <p className={styles.email}>{email}</p>
        </div>
      </div>
      <Link to={`/entrenador/rutinas/${id}`} className={styles.button}>
        Ver Rutinas
      </Link>
    </div>
  );
};

