import { Router } from 'express';
import { createUser, getAllUsers ,getClientesByEntrenador, getRutinasAsignadasPorUsuario} from '../controllers/usuario.controller';

const usuarioRouter = Router();

// Definir la ruta para obtener todos los usuarios
usuarioRouter.get('/', getAllUsers);
usuarioRouter.post('/', createUser);
usuarioRouter.get('/entrenador/:entrenadorId/clientes', getClientesByEntrenador);
usuarioRouter.get('/:id/rutinas-asignadas', getRutinasAsignadasPorUsuario);


export default usuarioRouter;
