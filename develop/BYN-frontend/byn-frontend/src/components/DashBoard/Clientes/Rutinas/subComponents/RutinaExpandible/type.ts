import { RutinaAsignada } from "../../../../../../types/Routine";

export interface RutinasClienteProps {
  rutinas: RutinaAsignada[];
  rutinaExpandida: RutinaAsignada | null;
  setRutinaExpandida: (rutina: RutinaAsignada | null) => void;
}