import axios from 'axios';

const api = axios.create({
  baseURL:  'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createUser = async (userData: {
  nombre: string;
  email: string;
  password: string;
  role: string;
}) => {
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
        return response.data; 
    } catch (error: any) {
        throw new Error(error.response?.data?.error || 'Error al iniciar sesión');
    }
}