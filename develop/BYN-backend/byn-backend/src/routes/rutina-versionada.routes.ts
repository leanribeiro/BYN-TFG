import { Router } from 'express';
import { getAllRoutinesVersions } from '../controllers/rutina-versionda.controller';

const rutinaVersionadaRouter = Router();

// Definir la ruta para obtener todas las rutinas
rutinaVersionadaRouter.get('/', getAllRoutinesVersions);

export default rutinaVersionadaRouter;
