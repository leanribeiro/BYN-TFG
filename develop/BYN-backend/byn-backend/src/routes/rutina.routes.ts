import { Router } from 'express';
import {
    asignarRutinaAUsuario,
  createRoutine,
  deleteRoutine,
  getAllRoutines,
  getRoutineById,
  getRoutinesByEntrenador,
  updateRoutine,
} from '../controllers/rutina.controller';

const rutinaRouter = Router();

rutinaRouter.get('/', getAllRoutines);
rutinaRouter.get('/entrenador/:entrenadorId', getRoutinesByEntrenador);
rutinaRouter.get('/:id', getRoutineById);
rutinaRouter.post('/', createRoutine);
rutinaRouter.put('/:id', updateRoutine);
rutinaRouter.delete('/:id', deleteRoutine);
rutinaRouter.post('/asignar', asignarRutinaAUsuario);

export default rutinaRouter;
