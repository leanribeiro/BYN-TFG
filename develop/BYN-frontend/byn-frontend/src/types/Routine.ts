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
  

  export interface Ejercicio {
    nombre: string;
    series: number;
    repeticiones: string;
    peso?: string;
    notas?: string;
  }
  export interface DiaRutina {
    nombre: string;
    ejercicios: Ejercicio[];
  }