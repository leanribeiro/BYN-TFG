import { Router } from 'express';
import { getEjercicios } from '../controllers/ejercicio.controller';

const ejercicioRouter = Router();

// Definir la ruta para obtener todas los ejercicios
ejercicioRouter.get('/', getEjercicios);

export default ejercicioRouter;
