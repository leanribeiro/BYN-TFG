import api from './api';
import { User } from '../types';

export const createUser = async (userData: User) => {
  try {
    const response = await api.post('/usuarios', userData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Error al registrar el usuario');
  }
};

export const getClientsByEntrenador = async (entrenadorId?: number) => {
  try {
    const response = await api.get(`/usuarios/entrenador/${entrenadorId}/clientes`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Error al obtener los clientes');
  }
};
