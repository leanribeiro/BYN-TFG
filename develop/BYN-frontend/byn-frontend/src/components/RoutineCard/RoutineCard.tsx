import styles from "./RoutineCard.module.css";
import { RoutineCardProps } from "./types";
import Button from "../Button/Button";
import { useState } from "react";
import { CustomPopup } from "../Popuop/Popup";
import CrearRutina from "../CreateRoutine/CreateRoutine";

export const RoutineCard: React.FC<RoutineCardProps> = ({
  id,
  titulo,
  descripcion,
}) => {
  // const [popupOpen, setPopupOpen] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.info}>
          <h3 className={styles.name}>{titulo}</h3>
          <p className={styles.email}>{descripcion}</p>
        </div>
      </div>
      <Button className={styles.button} onClick={() => setPopupOpen(true)}>
        Editar Rutina
      </Button>
      {/* <CustomPopup onClose={() => setPopupOpen(false)} open={popupOpen}>
      </CustomPopup> */}
    </div>
  );
};
