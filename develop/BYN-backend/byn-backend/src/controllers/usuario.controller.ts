import { NextFunction, Request, Response } from 'express';
import  dataSource  from '../data-source';
import { Usuario } from '../models/usuario.entity'; 
import bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { CreateUsuarioDTO } from '../dtos/create-ususario.dto';
import { validate } from 'class-validator';
import { ReadUsuarioDTO } from '../dtos/readUsuario.dto';
import { RutinaAsignada } from '../models/rutina-asignada.entity';
import { formatValidationErrors } from '../utils/validationFormatter';
import { ApiError } from '../errors/ApiError';


export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarioRepository = dataSource.getRepository(Usuario);
    const users = await usuarioRepository.find();

    const safeUsers = plainToInstance(ReadUsuarioDTO, users);
    res.json(safeUsers);
  } catch (err) {
    console.error('Error al obtener usuarios:', err);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};


export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const usuarioRepository = dataSource.getRepository(Usuario);
  const dto = plainToInstance(CreateUsuarioDTO, req.body);

  const errors = await validate(dto);
  if (errors.length > 0) {
    const mensajes = formatValidationErrors(errors);
    return next(new ApiError(400, "Datos inválidos", "VALIDATION_ERROR", mensajes));
  }

  try {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    let entrenador: Usuario | undefined = undefined;

    if (dto.entrenadorId) {
      const entrenadorEncontrado = await usuarioRepository.findOne({ where: { id: dto.entrenadorId } });
      if (!entrenadorEncontrado) {
        return next(new ApiError(404, "Entrenador no encontrado", "ENTRENADOR_NOT_FOUND"));
      }
      entrenador = entrenadorEncontrado;
    }

    const nuevoUsuario = usuarioRepository.create({
      nombre: dto.nombre,
      email: dto.email,
      password: hashedPassword,
      role: dto.role,
      entrenador: entrenador,
    });

    await usuarioRepository.save(nuevoUsuario);
    res.status(201).json({ mensaje: 'Usuario creado correctamente' });
  }
   catch (err: any) {
    console.error('Error al crear usuario:', err);
  
    // Verifica si es un error de entrada duplicada (correo ya existe)
    if (err.code === 'ER_DUP_ENTRY' && err.message.includes('usuario.IDX_2863682842e688ca198eb25c12')) {
      return next(new ApiError(400, "El correo ya está registrado", "DUPLICATE_EMAIL"));
    }
  
    return next(new ApiError(500, "Error interno al crear el usuario", "INTERNAL_ERROR"));
  }
};

export const getClientesByEntrenador = async (req: Request, res: Response): Promise<void> => {
  const { entrenadorId } = req.params;

  try {
    const usuarioRepository = dataSource.getRepository(Usuario);

    const clientes = await usuarioRepository.find({
      where: {
        role: 'CLIENTE',
        entrenador: { id: Number(entrenadorId) },
      },
      relations: ['entrenador'],
    });

    const safeClientes = plainToInstance(ReadUsuarioDTO, clientes);
    res.json(safeClientes);
  } catch (err) {
    console.error('Error al obtener clientes por entrenador:', err);
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
};

export const getRutinasAsignadasPorUsuario = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarioId = parseInt(req.params.id);

    if (isNaN(usuarioId)) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }

    const repo = dataSource.getRepository(RutinaAsignada);
    const rutinas = await repo.find({
      where: { usuario: { id: usuarioId } },
      relations: ['rutina', 'rutina.dias', 'rutina.dias.ejercicios'], // ajustá según tus relaciones
    });

    // Retornar solo la rutina
    res.json(rutinas.map(r => r.rutina));
  } catch (err) {
    console.error('Error al obtener rutinas asignadas:', err);
    res.status(500).json({ error: 'Error al obtener rutinas asignadas' });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const usuarioRepository = dataSource.getRepository(Usuario);
    const asignacionRepository = dataSource.getRepository(RutinaAsignada);

    const usuario = await usuarioRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!usuario) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }

    // 1. Eliminar las asignaciones relacionadas
    await asignacionRepository.delete({ usuario: { id: usuario.id } });

    // 2. Eliminar el usuario
    await usuarioRepository.remove(usuario);

    res.status(200).json({ mensaje: "Usuario eliminado correctamente" });
  } catch (err) {
    console.error("Error al eliminar usuario:", err);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
};