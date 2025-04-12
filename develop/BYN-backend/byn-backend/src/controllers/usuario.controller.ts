import { Request, Response } from 'express';
import  dataSource  from '../data-source';
import { Usuario } from '../models/usuario.entity'; 

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarioRepository = dataSource.getRepository(Usuario);

    const users = await usuarioRepository.find();

    res.json(users);
  } catch (err) {
    console.error('Error al obtener usuarios:', err);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};
