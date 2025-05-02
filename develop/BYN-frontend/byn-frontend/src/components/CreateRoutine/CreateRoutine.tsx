import React, { useState, useEffect } from "react";
import styles from "./CreateRoutine.module.css";
import Button from "../Button/Button";
import { createRoutine, updateRoutine } from "../../services/routinesService";
import { DashBoardProps } from "../../types";
import { useOutletContext } from "react-router-dom";
import { FormDatosBasicos } from "./Forms/FormDatosBasicos";
import { FormNuevoEjercicio } from "./Forms/FormNuevoEjercicio";
import InputText from "../Input/Input";

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
          <ul>
            {dias[diaActivo].ejercicios.map((ej, idx) => (
              <li key={idx}>
                {ej.nombre} - {ej.series}x{ej.repeticiones}
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
    </div>
  );
};

// import React, { useState } from "react";
// import styles from "./CreateRoutine.module.css";
// import Button from "../Button/Button";
// import { createRoutine } from "../../services/routinesService";
// import { DashBoardProps } from "../../types";
// import { useOutletContext } from "react-router-dom";
// import { FormDatosBasicos } from "./FormDatosBasicos/FormDatosBasicos";

// interface Ejercicio {
//   nombre: string;
//   series: number;
//   repeticiones: string;
//   peso?: string;
//   notas?: string;
// }

// interface DiaRutina {
//   nombre: string;
//   ejercicios: Ejercicio[];
// }

// interface CrearRutinaProps {
//   onSuccess?: () => void;
//   initialData?: {
//     id: number;
//     titulo: string;
//     tipo: string;
//     objetivo: string;
//     descripcion: string;
//     dias: DiaRutina[]; // si también querés prellenar los días
//   };
// }
// export const CrearRutina: React.FC<CrearRutinaProps> = (props) => {
//   const { onSuccess } = props;

//   const [formData, setFormData] = useState({
//     titulo: "",
//     tipo: "",
//     objetivo: "",
//     descripcion: "",
//   });
//   const { user } = useOutletContext<DashBoardProps>();

//   const [dias, setDias] = useState<DiaRutina[]>([
//     { nombre: "Día 1", ejercicios: [] },
//   ]);
//   const [diaActivo, setDiaActivo] = useState(0);
//   const [mostrarModalEjercicio, setMostrarModalEjercicio] = useState(false);
//   const [nuevoEjercicio, setNuevoEjercicio] = useState<Ejercicio>({
//     nombre: "",
//     series: 0,
//     repeticiones: "",
//     peso: "",
//     notas: "",
//   });

//   const selectTipoEntrenamientoOptions = [
//     { value: "fuerza", label: "Fuerza" },
//     { value: "hipertrofia", label: "Hipertrofia" },
//   ];
//   const selectObejetivosOptions = [
//     { value: "rendimiento", label: "Rendimiento" },
//     { value: "salud", label: "Salud" },
//   ];

//   const handleInputChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddDia = () => {
//     setDias([...dias, { nombre: `Día ${dias.length + 1}`, ejercicios: [] }]);
//     setDiaActivo(dias.length);
//   };

//   const handleAddEjercicio = () => {
//     const copiaDias = [...dias];
//     copiaDias[diaActivo].ejercicios.push(nuevoEjercicio);
//     setDias(copiaDias);
//     setNuevoEjercicio({
//       nombre: "",
//       series: 0,
//       repeticiones: "",
//       peso: "",
//       notas: "",
//     });
//     setMostrarModalEjercicio(false);
//   };

//   const handleSubmit = async () => {
//     const rutinaPayload = {
//       ...formData,
//       entrenadorId: user?.id || 1, // si tienes auth, pásalo dinámico
//       dias: dias.map((dia, index) => ({
//         nombre: dia.nombre,
//         orden: index + 1,
//         ejercicios: dia.ejercicios,
//       })),
//     };

//     try {
//       const nuevaRutina = await createRoutine(rutinaPayload);
//       console.log("Rutina creada:", nuevaRutina);
//       alert("✅ Rutina creada exitosamente");
//       if (onSuccess) {
//         console.log("Llamando a onSuccess desde el registro");
//         onSuccess();
//       }
//     } catch (error: any) {
//       alert("❌ Error al crear la rutina");
//       console.error(error);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Crear nueva rutina</h1>
//       <p className={styles.subtitle}>
//         Completa el formulario para crear una rutina personalizada con
//         ejercicios.
//       </p>

//       <FormDatosBasicos
//         formData={formData}
//         handleInputChange={handleInputChange}
//         selectTipoEntrenamientoOptions={selectTipoEntrenamientoOptions}
//         selectObejetivosOptions={selectObejetivosOptions}
//       />

//       <h2 className={styles.sectionTitle}>Días de entrenamiento</h2>
//       <div className={styles.daysSelector}>
//         {dias.map((dia, idx) => (
//           <Button
//             key={idx}
//             isActive={diaActivo === idx}
//             onClick={() => setDiaActivo(idx)}
//           >
//             {dia.nombre}
//           </Button>
//         ))}
//         <Button onClick={handleAddDia}>+ Añadir día</Button>
//       </div>

//       <input
//         className={styles.input}
//         value={dias[diaActivo].nombre}
//         onChange={(e) => {
//           const updated = [...dias];
//           updated[diaActivo].nombre = e.target.value;
//           setDias(updated);
//         }}
//       />

//       <div className={styles.exerciseBox}>
//         <h3>Ejercicios</h3>
//         {dias[diaActivo].ejercicios.length === 0 ? (
//           <p className={styles.emptyText}>No hay ejercicios añadidos aún.</p>
//         ) : (
//           <ul>
//             {dias[diaActivo].ejercicios.map((ej, idx) => (
//               <li key={idx}>
//                 {ej.nombre} - {ej.series}x{ej.repeticiones}
//               </li>
//             ))}
//           </ul>
//         )}
//         <Button onClick={() => setMostrarModalEjercicio(true)}>
//           ➕ Añadir ejercicio
//         </Button>
//       </div>

//       {mostrarModalEjercicio && (
//         <div className={styles.modal}>
//           <h4>Nuevo ejercicio</h4>
//           <label>Nombre del ejercico</label>
//           <input
//             placeholder="Nombre del ejercicio"
//             value={nuevoEjercicio.nombre}
//             onChange={(e) =>
//               setNuevoEjercicio({ ...nuevoEjercicio, nombre: e.target.value })
//             }
//             className={styles.input}
//           />
//           <label>Series</label>
//           <input
//             placeholder="Series"
//             type="number"
//             value={nuevoEjercicio.series}
//             onChange={(e) =>
//               setNuevoEjercicio({
//                 ...nuevoEjercicio,
//                 series: parseInt(e.target.value),
//               })
//             }
//             className={styles.input}
//           />
//           <label>Repeticiones</label>
//           <input
//             placeholder="Repeticiones"
//             value={nuevoEjercicio.repeticiones}
//             onChange={(e) =>
//               setNuevoEjercicio({
//                 ...nuevoEjercicio,
//                 repeticiones: e.target.value,
//               })
//             }
//             className={styles.input}
//           />
//           <label>Peso (opcional)</label>
//           <input
//             placeholder="Peso (opcional)"
//             value={nuevoEjercicio.peso}
//             onChange={(e) =>
//               setNuevoEjercicio({ ...nuevoEjercicio, peso: e.target.value })
//             }
//             className={styles.input}
//           />
//           <label>Notas (opcional)</label>
//           <textarea
//             placeholder="Notas (opcional)"
//             value={nuevoEjercicio.notas}
//             onChange={(e) =>
//               setNuevoEjercicio({ ...nuevoEjercicio, notas: e.target.value })
//             }
//             className={styles.input}
//           />
//           <div className={styles.modalActions}>
//             <button onClick={handleAddEjercicio} className={styles.addButton}>
//               Añadir ejercicio
//             </button>
//             <button
//               onClick={() => setMostrarModalEjercicio(false)}
//               className={styles.cancelButton}
//             >
//               Cancelar
//             </button>
//           </div>
//         </div>
//       )}

//       <div className={styles.footerActions}>
//         <button className={styles.cancelButton}>Cancelar</button>
//         <button onClick={handleSubmit} className={styles.saveButton}>
//           Guardar rutina
//         </button>
//       </div>
//     </div>
//   );
// };
