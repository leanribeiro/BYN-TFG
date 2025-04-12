// src/routes/index.ts
import { Router } from 'express';
import userRoutes from './usuario.routes';
import rutinaRouter from './rutina.routes';

const router = Router();

router.use('/usuarios', userRoutes);
router.use('/rutinas', rutinaRouter);

export default router;
