import React from "react";
import styles from "./RutinaExpandible.module.css";
import Button from "../../../../../Button/Button";
import arrowLeftIcon from "../../../../../../assets/icons/ArrowLeftIcon.svg";
import { getRoutineById } from "../../../../../../services/routinesService";
import { RutinasClienteProps } from "./type";



export const RutinaExpandible: React.FC<RutinasClienteProps> = (props) => {
  const { rutinas, rutinaExpandida, setRutinaExpandida } = props;

  const handleGetRutinaById = async (id:number) => {
    try {
      const detalles = await getRoutineById(id);
      setRutinaExpandida(detalles);
    } catch (err) {
      console.error("Error al cargar rutina:", err);
    }
  }  
  return (
    <>
      {rutinaExpandida ? (
        <div className={styles.rutinaBox}>
          <Button onClick={() => setRutinaExpandida(null)}>
            <img
              src={arrowLeftIcon}
              alt="Volver"
              className="back-button-icon"
            />
            Volver
          </Button>
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
            onClick={() => handleGetRutinaById(rutina.id)}

          >
            <h3>{rutina.titulo}</h3>
            <p>{rutina.descripcion}</p>
          </div>
        ))
      )}
    </>
  );
};
