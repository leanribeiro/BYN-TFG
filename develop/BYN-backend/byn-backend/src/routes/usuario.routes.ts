import { Router } from 'express';
import { getAllUsers } from '../controllers/usuario.controller';

const usuarioRouter = Router();

// Definir la ruta para obtener todos los usuarios
usuarioRouter.get('/usuarios', getAllUsers);

export default usuarioRouter;
