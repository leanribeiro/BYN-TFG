import { Router } from 'express';
import { getAllProgresos } from '../controllers/progreso.controller';

const progresoRouter = Router();

// Definir la ruta para obtener todas las rutinas
progresoRouter.get('/', getAllProgresos);

export default progresoRouter;
