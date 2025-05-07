import api from './api';
import { User } from '../types';

// Crea un usuario
export const createUser = async (userData: User) => {
  const response = await api.post('/usuarios', userData);
  return response.data;
};

// Obtiene los clientes de un entrenador
export const getClientsByEntrenador = async (entrenadorId?: number) => {
  const response = await api.get(`/usuarios/entrenador/${entrenadorId}/clientes`);
  return response.data;
};

// Elimina un usuario
export const deleteUser = async (userId: number) => {
  const response = await api.delete(`/usuarios/${userId}`);
  return response.data;
};
