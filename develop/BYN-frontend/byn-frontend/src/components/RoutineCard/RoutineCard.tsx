import styles from "./RoutineCard.module.css";
import { RoutineCardProps } from "./types";
import Button from "../Button/Button";
import { useState } from "react";
import { CustomPopup } from "../Popuop/Popup";
import { CrearRutina } from "../CreateRoutine/CreateRoutine";
import { getRoutineById } from "../../services/routinesService";
import { Trash } from "lucide-react";

export const RoutineCard: React.FC<RoutineCardProps> = ({
  id,
  titulo,
  descripcion,
  onSuccess,
}) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [routineData, setRoutineData] = useState<any>(null);
  const [initialRoutine, setInitialRoutine] = useState<any>(null);

  const handleEdit = async () => {
    try {
      const fullData = await getRoutineById(id);
      setRoutineData(fullData); // esto debe incluir dias, tipo, objetivo, etc.
      setPopupOpen(true);
    } catch (err) {
      console.error("Error al cargar rutina:", err);
      alert("Error al obtener la rutina");
    }
  };
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.info}>
          <h3 className={styles.name}>{titulo}</h3>
          <p className={styles.descripcion}>{descripcion}</p>
        </div>
      </div>
      <div className={styles.actions}>
        <Button
          onClick={async () => {
            const fullRoutine = await getRoutineById(id); // llamás al backend
            setInitialRoutine(fullRoutine);
            setPopupOpen(true);
          }}
        >
          Editar Rutina
        </Button>
        <Button
          onClick={() => {
            // Aquí puedes agregar la lógica para eliminar la rutina
            console.log("Eliminar rutina con ID:", id);
          }}
        >
          <Trash size={20} color="red" />
        </Button>
      </div>
      <CustomPopup open={popupOpen} onClose={() => setPopupOpen(false)}>
        {initialRoutine && (
          <CrearRutina
            initialData={initialRoutine}
            onSuccess={() => {
              onSuccess?.();
              setPopupOpen(false);
            }}
          />
        )}
      </CustomPopup>
    </div>
  );
};
