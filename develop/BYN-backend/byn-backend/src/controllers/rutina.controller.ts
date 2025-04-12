import { Request, Response } from 'express';
import  dataSource  from '../data-source';
import { Rutina } from '../models/rutina.entity';

export const getAllRoutines = async (req: Request, res: Response): Promise<void> => {
  try {
    const routinesRepository = dataSource.getRepository(Rutina);

    const users = await routinesRepository.find();

    res.json(users);
  } catch (err) {
    console.error('Error al obtener rutinas:', err);
    res.status(500).json({ error: 'Error al obtener rutinas' });
  }
};
