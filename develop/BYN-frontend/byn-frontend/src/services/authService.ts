import api from './api';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id: number;
  nombre: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await api.post('/auth/login', credentials);
  const user = jwtDecode<DecodedToken>(response.data.token);
  return {
    token: response.data.token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      nombre: user.nombre,
    },
  };
};
