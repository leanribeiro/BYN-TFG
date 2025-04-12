import { Router } from 'express';
import { getAllRoutines } from '../controllers/rutina.controller';

const rutinaRouter = Router();

// Definir la ruta para obtener todos los usuarios
rutinaRouter.get('/rutinas', getAllRoutines);

export default rutinaRouter;
