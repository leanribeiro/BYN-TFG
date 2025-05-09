import { Router } from 'express';
import usuarioRouter from './usuario.routes';
import rutinaRouter from './rutina.routes';
import authRouter from './auth.routes';

const router = Router();

router.use('/usuarios', usuarioRouter);
router.use('/rutinas', rutinaRouter);
router.use('/auth', authRouter);
export default router;
