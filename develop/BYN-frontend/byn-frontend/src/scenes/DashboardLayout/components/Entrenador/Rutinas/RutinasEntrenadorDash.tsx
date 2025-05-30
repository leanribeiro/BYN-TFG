import { useEffect, useState } from "react";
import styles from "./RutinasEntrenadorDash.module.css";
import { getRoutinesByEntrenador } from "../../../../../services/routinesService";
import { RoutineCard } from "../../../../../components/RoutineCard/RoutineCard";
import Button from "../../../../../components/Button/Button";
import { CustomPopup } from "../../../../../components/Popuop/Popup";
import { CrearRutina } from "../../../../../components/CreateRoutine/CreateRoutine";
import useAuthStore from "../../../../../store/authStore";

export const RutinasDashboard = () => {
  const [rutinas, setSelectedRoutine] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const { user } = useAuthStore();
  const getRutinas = async () => {
    try {
      const data = await getRoutinesByEntrenador(user?.id);
      setSelectedRoutine(data);
    } catch (err) {
      console.error("Error trayendo las rutinas:", err);
    }
  };

  useEffect(() => {
    getRutinas();
  }, [user?.id]);

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Rutinas</h1>
          <p className={styles.subtitle}>
            Crea y administra rutinas para tus clientes.
          </p>
        </div>
        <Button onClick={() => setPopupOpen(true)}>Crear Rutina</Button>
        <CustomPopup onClose={() => setPopupOpen(false)} open={popupOpen}>
          <CrearRutina
            onSuccess={() => {
              setPopupOpen(false);
              getRutinas();
            }}
          />
        </CustomPopup>
      </div>

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${styles.active}`}>Todas</button>
        <button className={styles.tab}>Asignadas</button>
        <button className={styles.tab}>Plantillas</button>
      </div>

      <div className={styles.clientList}>
        {rutinas.map((routine: any) => (
          <RoutineCard
            onSuccess={() => {
              getRutinas();
            }}
            key={routine.id}
            id={routine.id}
            titulo={routine.titulo}
            descripcion={routine.descripcion}
            tipo={routine.tipo}
            objetivo={routine.objetivo}
            dias={routine.dias}
          />
        ))}
      </div>
    </div>
  );
};
