import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { User } from '../types';


const api = axios.create({
  baseURL:  'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
interface DecodedToken {
    id: number;
    name: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
  }
export const createUser = async (userData: User) => {
  try {
    console.log('Datos del usuario:', userData); // Log para verificar los datos enviados
    const response = await api.post('/usuarios', userData);
    return response.data; 
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Error al registrar el usuario');
  }
};

export const loginUser = async (credentials: {
  email: string;
    password: string;
}) => {
    try{
        const response = await api.post('/auth/login', credentials);
        console.log('Respuesta del login:', response.data);
        const user = jwtDecode<DecodedToken>(response.data.token);
        console.log('Usuario decodificado:', user);
        return {token: response.data.token, user: {id: user.id, email: user.email, role: user.role}}; 
    } catch (error: any) {
        throw new Error(error.response?.data?.error || 'Error al iniciar sesión');
    }
}


export const getClientsByEntrenador = async (entrenadorId?: number) => {
  try {
    console.log('ID del entrenador:', entrenadorId); // Log para verificar el ID del entrenador
    const response = await api.get(`/usuarios/entrenador/${entrenadorId}/clientes`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Error al obtener los clientes del entrenador');
  }
};