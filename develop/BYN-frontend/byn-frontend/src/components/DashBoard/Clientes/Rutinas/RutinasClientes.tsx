import { useEffect, useState } from "react";
import styles from "./RutinasClientes.module.css";
import useAuthStore from "../../../../store/authStore";
import { getRoutineById, getRutinasAsignadasPorUsuario } from "../../../../services/routinesService";
import Button from "../../../Button/Button";

export const RutinasClientes = () => {
  const { user } = useAuthStore();
  const [rutinas, setRutinas] = useState<any[]>([]);
  const [rutinaExpandida, setRutinaExpandida] = useState<any | null>(null);

  useEffect(() => {
    if (user?.id) {
      getRutinasAsignadasPorUsuario(user.id)
        .then(setRutinas)
        .catch((err) => {
          console.error("Error al obtener rutinas asignadas:", err);
        });
    }
  }, [user?.id]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Mis Rutinas Asignadas</h2>

      {rutinaExpandida ? (
        <div className={styles.rutinaBox}>
          <Button onClick={() => setRutinaExpandida(null)}>← Volver</Button>
          <h3>{rutinaExpandida.titulo}</h3>
          <p>{rutinaExpandida.descripcion}</p>
          {rutinaExpandida.dias.map((dia: any, i: number) => (
            <div key={i} className={styles.dia}>
              <h4>{dia.nombre}</h4>
              <ul className={styles.ejercicioList}>
                {dia.ejercicios.map((e: any, j: number) => (
                  <li key={j}>
                    {e.nombre} - {e.series}x{e.repeticiones}
                    {e.peso && ` (${e.peso}kg)`}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : rutinas.length === 0 ? (
        <p>No tienes rutinas asignadas.</p>
      ) : (
        rutinas.map((rutina) => (
          <div
            key={rutina.id}
            className={styles.rutinaBox}
            onClick={async () => {
              try {
                const detalles = await getRoutineById(rutina.id);
                setRutinaExpandida(detalles);
              } catch (err) {
                console.error("Error al cargar rutina:", err);
              }
            }}
          >
            <h3>{rutina.titulo}</h3>
            <p>{rutina.descripcion}</p>
          </div>
        ))
      )}
    </div>
  );
};
