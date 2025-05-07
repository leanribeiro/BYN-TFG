import { useEffect, useState } from "react";
import styles from "./RutinasClientes.module.css";
import useAuthStore from "../../../../store/authStore";
import {
  getRutinasAsignadasPorUsuario,
} from "../../../../services/routinesService";
import { RutinaExpandible } from "./subComponents/RutinaExpandible/RutinaExpandible";
import { RutinaAsignada } from "../../../../types/Routine";

export const RutinasClientes = () => {
  const { user } = useAuthStore();
const [rutinas, setRutinas] = useState<RutinaAsignada[]>([]);
const [rutinaExpandida, setRutinaExpandida] = useState<RutinaAsignada | null>(null);

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

      <RutinaExpandible 
        rutinas={rutinas}
        rutinaExpandida={rutinaExpandida}
        setRutinaExpandida={setRutinaExpandida}
        />
    </div>
  );
};
