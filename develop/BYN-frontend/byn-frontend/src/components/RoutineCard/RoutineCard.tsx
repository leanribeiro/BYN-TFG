import styles from "./RoutineCard.module.css";
import { RoutineCardProps } from "./types";
import Button from "../Button/Button";
import { useState } from "react";
import { CustomPopup } from "../Popuop/Popup";
import { CrearRutina } from "../CreateRoutine/CreateRoutine";
import { deleteRoutine, getRoutineById } from "../../services/routinesService";
import { Trash } from "lucide-react";
import { toast } from "react-toastify";

export const RoutineCard: React.FC<RoutineCardProps> = ({
  id,
  titulo,
  descripcion,
  onSuccess,
}) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [initialRoutine, setInitialRoutine] = useState<any>(null);

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const handleDelete = async () =>{
   
      try {
        await deleteRoutine(id);
        toast.success(`Rutina borrada exitosamente`);
        
        setConfirmDeleteOpen(false);
        onSuccess?.(); 
      } catch (err) {
        console.log(err)
        alert("Error al eliminar la rutina");
      
    
  }
}
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
        <Button onClick={() => setConfirmDeleteOpen(true)}>
          <Trash size={20} color="white" />
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
      <CustomPopup
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
      >
        <div className={styles.confirmDelete}>
          <h3>¿Eliminar rutina?</h3>
          <p>Esta acción no se puede deshacer.</p>
          <div className={styles.confirmActionsDelete}>
            <Button
              onClick={handleDelete}
            >
              Confirmar
            </Button>
            <Button onClick={() => setConfirmDeleteOpen(false)}>
              Cancelar
            </Button>
          </div>
        </div>
      </CustomPopup>
    </div>
  );
};
