import React, { useState } from "react";
import styles from "./CreateRoutine.module.css";

interface Ejercicio {
  nombre: string;
  series: number;
  repeticiones: string;
  peso?: string;
  notas?: string;
}

interface DiaRutina {
  nombre: string;
  ejercicios: Ejercicio[];
}

export default function CrearRutina() {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    setNuevoEjercicio({ nombre: "", series: 0, repeticiones: "", peso: "", notas: "" });
    setMostrarModalEjercicio(false);
  };

  const handleSubmit = () => {
    const rutinaPayload = {
      ...formData,
      entrenadorId: 1,
      dias: dias.map((dia, index) => ({
        nombre: dia.nombre,
        orden: index + 1,
        ejercicios: dia.ejercicios,
      })),
    };
    console.log("Rutina a enviar:", rutinaPayload);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Crear nueva rutina</h1>
      <p className={styles.subtitle}>Completa el formulario para crear una rutina personalizada con ejercicios.</p>

      <div className={styles.gridInputs}>
        <input name="titulo" placeholder="Nombre de la rutina" value={formData.titulo} onChange={handleInputChange} className={styles.input} />
        <select name="tipo" value={formData.tipo} onChange={handleInputChange} className={styles.input}>
          <option value="">Selecciona el tipo</option>
          <option value="fuerza">Fuerza</option>
          <option value="hipertrofia">Hipertrofia</option>
        </select>
        <select name="objetivo" value={formData.objetivo} onChange={handleInputChange} className={styles.input}>
          <option value="">Selecciona el objetivo</option>
          <option value="rendimiento">Rendimiento</option>
          <option value="salud">Salud</option>
        </select>
        <textarea name="descripcion" placeholder="Descripción breve" value={formData.descripcion} onChange={handleInputChange} className={styles.input} />
      </div>

      <h2 className={styles.sectionTitle}>Días de entrenamiento</h2>
      <div className={styles.daysSelector}>
        {dias.map((dia, idx) => (
          <button
            key={idx}
            className={`${styles.dayButton} ${diaActivo === idx ? styles.activeDay : ''}`}
            onClick={() => setDiaActivo(idx)}
          >
            {dia.nombre}
          </button>
        ))}
        <button className={styles.addDayButton} onClick={handleAddDia}>+ Añadir día</button>
      </div>

      <input
        className={styles.input}
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
          <p className={styles.emptyText}>No hay ejercicios añadidos aún.</p>
        ) : (
          <ul>
            {dias[diaActivo].ejercicios.map((ej, idx) => (
              <li key={idx}>{ej.nombre} - {ej.series}x{ej.repeticiones}</li>
            ))}
          </ul>
        )}
        <button onClick={() => setMostrarModalEjercicio(true)} className={styles.addExerciseButton}>➕ Añadir ejercicio</button>
      </div>

      {mostrarModalEjercicio && (
        <div className={styles.modal}>
          <h4>Nuevo ejercicio</h4>
          <label>Nombre del ejercico</label>
          <input placeholder="Nombre del ejercicio" value={nuevoEjercicio.nombre} onChange={(e) => setNuevoEjercicio({ ...nuevoEjercicio, nombre: e.target.value })} className={styles.input} />
          <label>Series</label>
          <input placeholder="Series" type="number" value={nuevoEjercicio.series} onChange={(e) => setNuevoEjercicio({ ...nuevoEjercicio, series: parseInt(e.target.value) })} className={styles.input} />
            <label>Repeticiones</label>
          <input placeholder="Repeticiones" value={nuevoEjercicio.repeticiones} onChange={(e) => setNuevoEjercicio({ ...nuevoEjercicio, repeticiones: e.target.value })} className={styles.input} />
          <label>Peso (opcional)</label>
          <input placeholder="Peso (opcional)" value={nuevoEjercicio.peso} onChange={(e) => setNuevoEjercicio({ ...nuevoEjercicio, peso: e.target.value })} className={styles.input} />
          <label>Notas (opcional)</label>
          <textarea placeholder="Notas (opcional)" value={nuevoEjercicio.notas} onChange={(e) => setNuevoEjercicio({ ...nuevoEjercicio, notas: e.target.value })} className={styles.input} />
          <div className={styles.modalActions}>
            <button onClick={handleAddEjercicio} className={styles.addButton}>Añadir ejercicio</button>
            <button onClick={() => setMostrarModalEjercicio(false)} className={styles.cancelButton}>Cancelar</button>
          </div>
        </div>
      )}

      <div className={styles.footerActions}>
        <button className={styles.cancelButton}>Cancelar</button>
        <button onClick={handleSubmit} className={styles.saveButton}>Guardar rutina</button>
      </div>
    </div>
  );
}
