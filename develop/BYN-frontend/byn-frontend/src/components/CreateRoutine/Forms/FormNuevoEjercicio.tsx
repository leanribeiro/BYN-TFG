import React from "react";
import styles from "./FormNuevoEjercicio.module.css";
interface FormNuevoEjercicioProps {
  nuevoEjercicio: Ejercicio;
  setNuevoEjercicio: React.Dispatch<
    React.SetStateAction<{
      nombre: string;
      series: number;
      repeticiones: number;
      peso?: string;
      notas?: string;
    }>
  >;
  setMostrarModalEjercicio: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddEjercicio: () => void;
}

export const FormNuevoEjercicio: React.FC<FormNuevoEjercicioProps> = (props) => {
    const {nuevoEjercicio, setNuevoEjercicio, setMostrarModalEjercicio, handleAddEjercicio} = props;
  return (
    <div className={styles.modal}>
      <h4>Nuevo ejercicio</h4>
      <input
        placeholder="Nombre del ejercicio"
        value={nuevoEjercicio.nombre}
        onChange={(e) =>
          setNuevoEjercicio({ ...nuevoEjercicio, nombre: e.target.value })
        }
        className={styles.input}
      />
      <input
        placeholder="Series"
        type="number"
        value={nuevoEjercicio.series}
        onChange={(e) =>
          setNuevoEjercicio({
            ...nuevoEjercicio,
            series: parseInt(e.target.value),
          })
        }
        className={styles.input}
      />
      <input
        placeholder="Repeticiones"
        value={nuevoEjercicio.repeticiones}
        onChange={(e) =>
          setNuevoEjercicio({ ...nuevoEjercicio, repeticiones: e.target.value })
        }
        className={styles.input}
      />
      <input
        placeholder="Peso (opcional)"
        value={nuevoEjercicio.peso}
        onChange={(e) =>
          setNuevoEjercicio({ ...nuevoEjercicio, peso: e.target.value })
        }
        className={styles.input}
      />
      <textarea
        placeholder="Notas (opcional)"
        value={nuevoEjercicio.notas}
        onChange={(e) =>
          setNuevoEjercicio({ ...nuevoEjercicio, notas: e.target.value })
        }
        className={styles.input}
      />
      <div className={styles.modalActions}>
        <button onClick={handleAddEjercicio} className={styles.addButton}>
          Añadir ejercicio
        </button>
        <button
          onClick={() => setMostrarModalEjercicio(false)}
          className={styles.cancelButton}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
