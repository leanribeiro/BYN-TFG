import { Link } from "react-router-dom";
import styles from "./ClientCard.module.css";
import { ClientCardProps } from "./types";
import Button from "../Button/Button";
import { CustomPopup } from "../Popuop/Popup";
import { useEffect, useState } from "react";
import {
  asignarRutina,
  getRoutinesByEntrenador,
} from "../../services/routinesService";
import useAuthStore from "../../store/authStore";

export const ClientCard: React.FC<ClientCardProps> = ({
  id,
  nombre,
  email,
}) => {
  const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
    nombre
  )}&backgroundColor=b6e3f4`;
  const { user } = useAuthStore();
  const [rutinaSeleccionada, setRutinaSeleccionada] = useState<any>(null);

  const [popupOpen, setPopupOpen] = useState(false);
  const [rutinas, setRutinas] = useState<any[]>([]); // podrías tiparlo
  useEffect(() => {
    if (popupOpen) {
      getRoutinesByEntrenador(user?.id).then(setRutinas).catch(console.error);
    }
  }, [popupOpen]);
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <img src={avatarUrl} alt={nombre} className={styles.avatar} />
        <div className={styles.info}>
          <h3 className={styles.name}>{nombre}</h3>
          <p className={styles.email}>{email}</p>
        </div>
      </div>
      <div className={styles.actions}>
        <Button onClick={() => setPopupOpen(true)}>Ver Rutinas</Button>
        <Button onClick={() => setPopupOpen(true)}>Asignar Rutina</Button>
      </div>
      <CustomPopup onClose={() => setPopupOpen(false)} open={popupOpen}>
        <div className={styles.popupContent}>
          <h2 className={styles.popupTitle}>Asignar rutina a {nombre}</h2>

          <div className={styles.rutinasList}>
            {rutinas.map((rutina) => (
              <div
                key={rutina.id}
                className={`${styles.rutinaItem} ${
                  rutinaSeleccionada === rutina.id ? styles.selected : ""
                }`}
                onClick={() => setRutinaSeleccionada(rutina.id)}
              >
                <h4>{rutina.titulo}</h4>
                <p>{rutina.descripcion}</p>
              </div>
            ))}
          </div>
          <div className={styles.asignarButtonContainer}>
            <Button
              disabled={!rutinaSeleccionada}
              onClick={async () => {
                try {
                  await asignarRutina(id, rutinaSeleccionada!, user?.id);
                  alert("Rutina asignada correctamente");
                  setPopupOpen(false);
                } catch (err: any) {
                  alert(err.message);
                }
              }}
            >
              Asignar rutina seleccionada
            </Button>
          </div>
        </div>
      </CustomPopup>
    </div>
  );
};
