import { Router } from 'express';
import { createUser, getAllUsers } from '../controllers/usuario.controller';

const usuarioRouter = Router();

// Definir la ruta para obtener todos los usuarios
usuarioRouter.get('/', getAllUsers);
usuarioRouter.post('/', createUser);
export default usuarioRouter;
