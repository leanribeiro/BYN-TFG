import { Request, Response } from 'express';
import  dataSource  from '../data-source';
import { RutinaVersionada } from '../models/rutina-versionada.entity';

export const getAllRoutinesVersions = async (req: Request, res: Response): Promise<void> => {
  try {
    const routinesRepository = dataSource.getRepository(RutinaVersionada);

    const users = await routinesRepository.find();

    res.json(users);
  } catch (err) {
    console.error('Error al obtener rutinas:', err);
    res.status(500).json({ error: 'Error al obtener rutinas' });
  }
};
