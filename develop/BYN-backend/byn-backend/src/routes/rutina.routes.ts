import { Router } from 'express';
import { getAllRoutines } from '../controllers/rutina.controller';

const rutinaRouter = Router();

// Definir la ruta para obtener todas las rutinas
rutinaRouter.get('/', getAllRoutines);

export default rutinaRouter;
