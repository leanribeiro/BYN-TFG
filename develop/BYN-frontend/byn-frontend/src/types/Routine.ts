import { Ejercicio } from "./EjercicioProps";

export interface Routine {
    id: number;
    titulo: string;
    descripcion: string;
    fecha_creacion: string; 
    entrenador: {
      id: number;
      nombre: string;
      email: string;
      role: string;
    };
    versiones?: any[]; 
  }
  

  export interface DiaRutina {
    nombre: string;
    orden?: number;
    ejercicios: Ejercicio[];
  }

  export interface RutinaAsignada {
    id: number;
    titulo: string;
    descripcion: string;
    dias: DiaRutina[];
  }
  