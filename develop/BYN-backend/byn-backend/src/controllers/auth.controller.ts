import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Usuario } from '../models/usuario.entity';
import dataSource from '../data-source';

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const usuarioRepository = dataSource.getRepository(Usuario);
    const usuario = await usuarioRepository.findOne({ where: { email } });

    if (!usuario) {
    
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;  // Asegúrate de hacer el return para que no se sigan ejecutando más líneas
    }

    const match = await bcrypt.compare(password, usuario.password);
    if (!match) {
      res.status(401).json({ error: 'Contraseña incorrecta' });
      return;  // Asegúrate de hacer el return para que no se sigan ejecutando más líneas
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, role: usuario.role, nombre: usuario.nombre },
      process.env.JWT_SECRET || 'defaultSecret',
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });  // Devuelve el token al cliente
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
