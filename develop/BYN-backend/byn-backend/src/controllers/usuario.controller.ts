import { Request, Response } from 'express';
import  dataSource  from '../data-source';
import { Usuario } from '../models/usuario.entity'; 
import bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { CreateUsuarioDTO } from '../dtos/create-ususario.dto';
import { validate } from 'class-validator';
import { ReadUsuarioDTO } from '../dtos/readUsuario.dto';


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


export const createUser = async (req: Request, res: Response): Promise<void> => {
  const usuarioRepository = dataSource.getRepository(Usuario);
  const dto = plainToInstance(CreateUsuarioDTO, req.body);
  console.log('Cuerpo de la solicitud:', dto);
  const errors = await validate(dto);
  if (errors.length > 0) {
    console.error('Errores de validación:', errors);
    res.status(400).json({ errores: errors.map(e => e.constraints) });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    let entrenador: Usuario | undefined = undefined;

    if (dto.entrenadorId) {
      const entrenadorEncontrado = await usuarioRepository.findOne({ where: { id: dto.entrenadorId } });
      if (!entrenadorEncontrado) {
        res.status(404).json({ error: 'Entrenador no encontrado' });
        return;
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

    console.log('Nuevo usuario:', nuevoUsuario);
    await usuarioRepository.save(nuevoUsuario);
    res.status(201).json({ mensaje: 'Usuario creado correctamente' });
  } catch (err) {
    console.error('Error al crear usuario:', err);
    res.status(500).json({ error: 'Error al crear el usuario' });
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