import styles from "./ClientCard.module.css";
import { ClientCardProps } from "./types";
import Button from "../Button/Button";
import { CustomPopup } from "../Popuop/Popup";
import { useEffect, useState } from "react";
import {
  asignarRutina,
  getRoutinesByEntrenador,
  getRoutineById,
  getRutinasAsignadasPorUsuario,
} from "../../services/routinesService";
import useAuthStore from "../../store/authStore";
import { Trash } from "lucide-react";
import { deleteUser } from "../../services/userService";
import { toast } from "react-toastify";
import { RutinaAsignada } from "../../types/Routine";

export const ClientCard: React.FC<ClientCardProps> = ({
  id,
  nombre,
  email,
  onDelete,
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
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  useEffect(() => {
    if (popupOpen) {
      if (modo === "asignar") {
        getRoutinesByEntrenador(user?.id).then(setRutinas).catch(console.error);
      } else {
        getRutinasAsignadasPorUsuario(id)
          .then(setRutinasAsignadas)
          .catch(console.error);
      }
    }
  }, [popupOpen, modo]);

  const handleDelete = async () => {
    try {
      await deleteUser(id);
      toast.success(`Cliente borrado exitosamente`);
      
      onDelete?.(); // Notifica al padre que se elimine el cliente
    } catch (error: any) {
      console.error("Error al eliminar el usuario:", error);
      alert(error.message);
    } finally {
      setConfirmDeleteOpen(false);
    }
  };

  const handleAsignarRutina = async () => {
    try {
      await asignarRutina(id, rutinaSeleccionada!, user?.id);
      toast.success(`Rutina asignada exitosamente`);

      setPopupOpen(false);
    } catch (err: any) {
      alert(err.message);
    }
  }


  const handleGetRoutineById = async (r:RutinaAsignada) => {
    try {
      const detalles = await getRoutineById(r.id);
      setRutinaExpandida(detalles);
    } catch (err:any) {
      console.log("Error al cargar rutina",err)
    }
  }
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <img src={avatarUrl} alt={nombre} className={styles.avatar} />
        <div className={styles.info}>
          <h3 className={styles.name}>{nombre}</h3>
          <p className={styles.email}>{email}</p>
        </div>
        <Button
          className={styles.deleteButton}
          onClick={() => setConfirmDeleteOpen(true)}
        >
          <Trash />
        </Button>
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
                  onClick={handleAsignarRutina}
                >
                  Asignar rutina seleccionada
                </Button>
              </div>
            </>
          ) : (
            <>
              <h2 className={styles.popupTitle}>
                Rutinas asignadas a {nombre}
              </h2>
              {rutinaExpandida ? (
                <>
                  <Button onClick={() => setRutinaExpandida(null)}>
                    ← Volver
                  </Button>
                  <h3>{rutinaExpandida.titulo}</h3>
                  <p>{rutinaExpandida.descripcion}</p>
                  {rutinaExpandida.dias.map((dia: any, i: number) => (
                    <div key={i} className={styles.diaBox}>
                      <h4>{dia.nombre}</h4>
                      <ul className={styles.ejercicioList}>
                        {dia.ejercicios.map((e: any, j: number) => (
                          <li key={j} className={styles.ejercicioItem}>
                            {e.nombre} - {e.series}x{e.repeticiones}{" "}
                            {e.peso && `(${e.peso}kg)`}
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
                        onClick={()=>handleGetRoutineById(r)}
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
      
      <CustomPopup
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
      >
        <div className={styles.confirmBox}>
          <h3 className={styles.confirmTitle}>Confirmar eliminación</h3>
          <p className={styles.confirmMessage}>
            ¿Estás seguro de que querés eliminar a <strong>{nombre}</strong>?
          </p>
          <div className={styles.confirmButtonsRow}>
            <Button onClick={() => setConfirmDeleteOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleDelete}
              className={styles.confirmDeleteButton}
            >
              Sí, borrar
            </Button>
          </div>
        </div>
      </CustomPopup>
    </div>
  );
};
