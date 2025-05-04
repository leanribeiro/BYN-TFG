import React from "react";
import styles from "./FormNuevoEjercicio.module.css";
import { Ejercicio } from "../../../types/Routine";
import InputText from "../../Input/Input";
import TextAreaInput from "../../TextareaInput/TextAreaInput";
import Button from "../../Button/Button";
interface FormNuevoEjercicioProps {
  nuevoEjercicio: Ejercicio;
  setNuevoEjercicio: React.Dispatch<
    React.SetStateAction<{
      nombre: string;
      series: number;
      repeticiones: string;
      peso?: string;
      notas?: string;
    }>
  >;
  setMostrarModalEjercicio: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddEjercicio: () => void;
}

export const FormNuevoEjercicio: React.FC<FormNuevoEjercicioProps> = (
  props
) => {
  const {
    nuevoEjercicio,
    setNuevoEjercicio,
    setMostrarModalEjercicio,
    handleAddEjercicio,
  } = props;
  return (
    <div className={styles.modal}>
      <h4>Nuevo ejercicio</h4>
      <InputText
        type="text"
        name="nombre"
        placeholder="Nombre del ejercicio"
        value={nuevoEjercicio.nombre}
        onChange={(e) =>
          setNuevoEjercicio({ ...nuevoEjercicio, nombre: e.target.value })
        }
      />
      <InputText
        value={nuevoEjercicio.series}
        name="series"
        placeholder="Series"
        type="number"
        hasLabel={true}
        labelText="Series"
        onChange={(e) =>
          setNuevoEjercicio({
            ...nuevoEjercicio,
            series: parseInt(e.target.value),
          })
        }
      />
      <InputText
        type="text"
        name="repeticiones"
        hasLabel={true}
        labelText="Repeticiones"
        
        placeholder="Repeticiones"
        value={nuevoEjercicio.repeticiones}
        onChange={(e) =>
          setNuevoEjercicio({ ...nuevoEjercicio, repeticiones: e.target.value })
        }
      />
      <InputText
        type="text"
        name="peso"
        hasLabel={true}
        labelText="Peso"
        placeholder="Peso (opcional)"
        value={nuevoEjercicio.peso}
        onChange={(e) =>
          setNuevoEjercicio({ ...nuevoEjercicio, peso: e.target.value })
        }
      />
      <TextAreaInput
        name="notas"
        hasLabel={true} 
        labelText="Notas"
        placeholder="Notas (opcional)"
        value={nuevoEjercicio.notas}
        onChange={(e) =>
          setNuevoEjercicio({ ...nuevoEjercicio, notas: e.target.value })
        }
      />
      <div className={styles.modalActions}>
        <Button onClick={handleAddEjercicio} >
          Añadir ejercicio
        </Button>
        <Button
          onClick={() => setMostrarModalEjercicio(false)}
         
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
};
