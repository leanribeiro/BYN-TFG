import { Request, Response } from 'express';
import  dataSource  from '../data-source';
import { Progreso } from '../models/progreso.entity';

export const getAllProgresos= async (req: Request, res: Response): Promise<void> => {
  try {
    const progresoRepository = dataSource.getRepository(Progreso);

    const users = await progresoRepository.find();

    res.json(users);
  } catch (err) {
    console.error('Error al obtener progreso:', err);
    res.status(500).json({ error: 'Error al obtener progreso' });
  }
};
