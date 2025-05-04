import React, { useState, useEffect } from "react";
import styles from "./CreateRoutine.module.css";
import Button from "../Button/Button";
import { createRoutine, updateRoutine } from "../../services/routinesService";
import { DashBoardProps } from "../../types";
import { useOutletContext } from "react-router-dom";
import { FormDatosBasicos } from "./Forms/FormDatosBasicos";
import { FormNuevoEjercicio } from "./Forms/FormNuevoEjercicio";
import InputText from "../Input/Input";
import { DiaRutina, Ejercicio } from "../../types/Routine";
import { Dumbbell, Trash } from "lucide-react";

interface CrearRutinaProps {
  onSuccess?: () => void;
  initialData?: {
    id: number;
    titulo: string;
    tipo: string;
    objetivo: string;
    descripcion: string;
    dias: DiaRutina[];
  };
}

export const CrearRutina: React.FC<CrearRutinaProps> = ({
  onSuccess,
  initialData,
}) => {
  const { user } = useOutletContext<DashBoardProps>();

  const [formData, setFormData] = useState({
    titulo: "",
    tipo: "",
    objetivo: "",
    descripcion: "",
  });

  const [dias, setDias] = useState<DiaRutina[]>([
    { nombre: "Día 1", ejercicios: [] },
  ]);
  const [diaActivo, setDiaActivo] = useState(0);
  const [mostrarModalEjercicio, setMostrarModalEjercicio] = useState(false);
  const [nuevoEjercicio, setNuevoEjercicio] = useState<Ejercicio>({
    nombre: "",
    series: 0,
    repeticiones: "",
    peso: "",
    notas: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        titulo: initialData.titulo,
        tipo: initialData.tipo,
        objetivo: initialData.objetivo,
        descripcion: initialData.descripcion,
      });
      setDias(initialData.dias);
    }
  }, [initialData]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddDia = () => {
    setDias([...dias, { nombre: `Día ${dias.length + 1}`, ejercicios: [] }]);
    setDiaActivo(dias.length);
  };

  const handleAddEjercicio = () => {
    const copiaDias = [...dias];
    copiaDias[diaActivo].ejercicios.push(nuevoEjercicio);
    setDias(copiaDias);
    setNuevoEjercicio({
      nombre: "",
      series: 0,
      repeticiones: "",
      peso: "",
      notas: "",
    });
    setMostrarModalEjercicio(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const rutinaPayload = {
      ...formData,
      entrenadorId: user?.id || 1,
      dias: dias.map((dia, index) => ({
        nombre: dia.nombre,
        orden: index + 1,
        ejercicios: dia.ejercicios,
      })),
    };
    try {
      if (initialData) {
        await updateRoutine(initialData.id, rutinaPayload);
      } else {
        await createRoutine(rutinaPayload);
      }
      alert(`Rutina ${initialData ? "actualizada" : "creada"} exitosamente`);
      onSuccess?.();
    } catch (error) {
      console.error("Error al guardar la rutina", error);
      alert("Error al guardar la rutina");
    }
  };

  const selectTipoEntrenamientoOptions = [
    { value: "fuerza", label: "Fuerza" },
    { value: "hipertrofia", label: "Hipertrofia" },
  ];

  const selectObejetivosOptions = [
    { value: "rendimiento", label: "Rendimiento" },
    { value: "salud", label: "Salud" },
  ];

  const handleDeleteEjercicio = (index: number) => {
    const copiaDias = [...dias];
    copiaDias[diaActivo].ejercicios.splice(index, 1); // Elimina el ejercicio en el índice dado
    setDias(copiaDias);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {initialData ? "Editar rutina" : "Crear nueva rutina"}
      </h1>
      <p className={styles.subtitle}>
        {initialData
          ? "Modifica los datos de la rutina seleccionada."
          : "Completa el formulario para crear una rutina personalizada."}
      </p>

      <FormDatosBasicos
        formData={formData}
        handleInputChange={handleInputChange}
        selectTipoEntrenamientoOptions={selectTipoEntrenamientoOptions}
        selectObejetivosOptions={selectObejetivosOptions}
      />

      <h2 className={styles.sectionTitle}>Días de entrenamiento</h2>
      <div className={styles.daysSelector}>
        {dias.map((dia, idx) => (
          <Button
            key={idx}
            isActive={diaActivo === idx}
            onClick={() => setDiaActivo(idx)}
          >
            {dia.nombre}
          </Button>
        ))}
        <Button onClick={handleAddDia}>+ Añadir día</Button>
      </div>

      {/* Ejercicios */}

      <InputText
        type="text"
        name="nombreDia"
        placeholder="Nombre del día"
        hasLabel={true}
        labelText="Nombre del día"
        value={dias[diaActivo].nombre}
        onChange={(e) => {
          const updated = [...dias];
          updated[diaActivo].nombre = e.target.value;
          setDias(updated);
        }}
      />

      <div className={styles.exerciseBox}>
        <h3>Ejercicios</h3>
        {dias[diaActivo].ejercicios.length === 0 ? (
          <p className={styles.emptyText}>No hay ejercicios añadidos.</p>
        ) : (
          <ul className={styles.ejercicioList}>
          {dias[diaActivo].ejercicios.map((ej, idx) => (
            <li key={idx} className={styles.ejercicioItem}>
              <div className={styles.ejercicioContent}>
                <Dumbbell size={18} />
                <span>{ej.nombre} - {ej.series}x{ej.repeticiones}</span>
              </div>
              <Button onClick={() => handleDeleteEjercicio(idx)}>
                <Trash size={16} color="white" />
              </Button>
            </li>
          ))}
        </ul>
        )}
        <Button onClick={() => setMostrarModalEjercicio(true)}>
          ➕ Añadir ejercicio
        </Button>
      </div>

      {mostrarModalEjercicio && (
        <FormNuevoEjercicio
          nuevoEjercicio={nuevoEjercicio}
          setNuevoEjercicio={setNuevoEjercicio}
          handleAddEjercicio={handleAddEjercicio}
          setMostrarModalEjercicio={setMostrarModalEjercicio}
        />
      )}
      <div className={styles.footerActions}>
        <button className={styles.cancelButton}>Cancelar</button>
        <button onClick={handleSubmit} className={styles.saveButton}>
          Guardar rutina
        </button>
      </div>
    </div>
  );
};
