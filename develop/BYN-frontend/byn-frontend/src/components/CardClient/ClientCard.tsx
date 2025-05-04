import { Link } from "react-router-dom";
import styles from "./ClientCard.module.css";
import { ClientCardProps } from "./types";
import Button from "../Button/Button";
import { CustomPopup } from "../Popuop/Popup";
import { useEffect, useState } from "react";
import {
  asignarRutina,
  getRoutinesByEntrenador,
  getRoutineById,
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
  const [rutinas, setRutinas] = useState<any[]>([]);
  const [modo, setModo] = useState<"ver" | "asignar">("ver");
  const [rutinasAsignadas, setRutinasAsignadas] = useState<any[]>([]);
  const [rutinaExpandida, setRutinaExpandida] = useState<any | null>(null);

  useEffect(() => {
    if (popupOpen) {
      if (modo === "asignar") {
        getRoutinesByEntrenador(user?.id)
          .then(setRutinas)
          .catch(console.error);
      } else {
        // Simulación: deberías usar un endpoint real
        getRoutinesByEntrenador(user?.id)
          .then((res) => setRutinasAsignadas(res))
          .catch(console.error);
      }
    }
  }, [popupOpen, modo]);

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
        <Button
          onClick={() => {
            setModo("ver");
            setPopupOpen(true);
          }}
        >
          Ver Rutinas
        </Button>
        <Button
          onClick={() => {
            setModo("asignar");
            setPopupOpen(true);
          }}
        >
          Asignar Rutina
        </Button>
      </div>
      <CustomPopup onClose={() => setPopupOpen(false)} open={popupOpen}>
        <div className={styles.popupContent}>
          {modo === "asignar" ? (
            <>
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
            </>
          ) : (
            <>
              <h2 className={styles.popupTitle}>Rutinas asignadas a {nombre}</h2>
              {rutinaExpandida ? (
                <>
                  <Button onClick={() => setRutinaExpandida(null)}>← Volver</Button>
                  <h3>{rutinaExpandida.titulo}</h3>
                  <p>{rutinaExpandida.descripcion}</p>
                  {rutinaExpandida.dias.map((dia: any, i: number) => (
                    <div key={i} className={styles.diaBox}>
                      <h4>{dia.nombre}</h4>
                      <ul className={styles.ejercicioList}>
                        {dia.ejercicios.map((e: any, j: number) => (
                          <li key={j} className={styles.ejercicioItem}>
                            {e.nombre} - {e.series}x{e.repeticiones} {e.peso && `(${e.peso}kg)`}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </>
              ) : (
                <ul className={styles.ejercicioList}>
                  {rutinasAsignadas.length === 0 ? (
                    <p>No hay rutinas asignadas.</p>
                  ) : (
                    rutinasAsignadas.map((r) => (
                      <li
                        key={r.id}
                        className={styles.ejercicioItem}
                        onClick={async () => {
                          try {
                            const detalles = await getRoutineById(r.id);
                            setRutinaExpandida(detalles);
                          } catch (err) {
                            alert("Error al cargar rutina");
                          }
                        }}
                      >
                        <span>{r.titulo}</span>
                      </li>
                    ))
                  )}
                </ul>
              )}
            </>
          )}
        </div>
      </CustomPopup>
    </div>
  );
};
