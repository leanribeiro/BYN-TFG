import { Request, Response } from 'express';
import  dataSource  from '../data-source';
import { Ejercicio } from '../models/ejercicio.entity';

export const getEjercicios = async (req: Request, res: Response): Promise<void> => {
  try {
    const ejerciciosRepository = dataSource.getRepository(Ejercicio);

    const users = await ejerciciosRepository.find();

    res.json(users);
  } catch (err) {
    console.error('Error al obtener rutinas:', err);
    res.status(500).json({ error: 'Error al obtener rutinas' });
  }
};
