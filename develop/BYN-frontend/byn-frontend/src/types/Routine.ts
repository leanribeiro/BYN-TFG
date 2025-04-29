export interface Routine {
    id: number;
    titulo: string;
    descripcion: string;
    fecha_creacion: string; // puedes usar `Date` si conviertes el string a Date
    entrenador: {
      id: number;
      nombre: string;
      email: string;
      role: string;
    };
    versiones?: any[]; // o tipa `RutinaVersionada[]` si tienes su estructura también
  }
  