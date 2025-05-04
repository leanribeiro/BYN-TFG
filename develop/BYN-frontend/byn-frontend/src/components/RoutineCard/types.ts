import { DiaRutina } from "../../types/Routine";

export interface RoutineCardProps {
  id: number;
  titulo: string;
  descripcion: string;
  tipo: string;
  objetivo: string;
  dias: DiaRutina[];
  onSuccess?: () => void;
}