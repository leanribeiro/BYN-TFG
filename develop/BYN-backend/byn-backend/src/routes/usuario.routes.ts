import { Router } from 'express';
import { createUser, getAllUsers ,getClientesByEntrenador} from '../controllers/usuario.controller';

const usuarioRouter = Router();

// Definir la ruta para obtener todos los usuarios
usuarioRouter.get('/', getAllUsers);
usuarioRouter.post('/', createUser);
usuarioRouter.get('/entrenador/:entrenadorId/clientes', getClientesByEntrenador);
export default usuarioRouter;
