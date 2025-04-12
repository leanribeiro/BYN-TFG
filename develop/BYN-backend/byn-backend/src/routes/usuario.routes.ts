import { Router } from 'express';
import { getAllUsers } from '../controllers/usuario.controller';

const usuarioRouter = Router();

// Definir la ruta para obtener todos los usuarios
usuarioRouter.get('/', getAllUsers);

export default usuarioRouter;
