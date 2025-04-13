import { Router } from 'express';
import usuarioRouter from './usuario.routes';
import rutinaRouter from './rutina.routes';
import rutinaVersionadaRouter from './rutina-versionada.routes';
import ejercicioRouter from './ejercicio.routes';
import progresoRouter from './progreso.routes';
import authRouter from './auth.routes';

const router = Router();

router.use('/usuarios', usuarioRouter);
router.use('/rutinas', rutinaRouter);
router.use('/rutinas-versionadas', rutinaVersionadaRouter);
router.use('/ejercicios', ejercicioRouter);
router.use('/progresos', progresoRouter);
router.use('/auth', authRouter);
export default router;
