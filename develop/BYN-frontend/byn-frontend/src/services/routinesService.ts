import api from './api';

export const createRoutine = async (data:any) => {
  try {
    const response = await api.post('/rutinas', data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Error al crear rutina');
  }
};
export const updateRoutine = async (id: number, data: {
  titulo: string;
  descripcion: string;
  tipo: string;
  objetivo: string;
  dias: {
    nombre: string;
    orden: number;
    ejercicios: {
      nombre: string;
      series: number;
      repeticiones: string;
      peso?: string;
      notas?: string;
    }[];
  }[];
}) => {
  try {
    const response = await api.put(`/rutinas/${id}`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Error al actualizar rutina');
  }
};

export const getRoutineById = async (id: number) => {
  const response = await api.get(`/rutinas/${id}`);
  return response.data;
};


export const getRoutinesByEntrenador = async (entrenadorId?: number) => {
  try {
    const response = await api.get(`/rutinas/entrenador/${entrenadorId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Error al obtener rutinas');
  }
};

export const getAllRoutines = async () => {
  try {
    const response = await api.get('/rutinas');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Error al obtener rutinas');
  }
};



export const deleteRoutine = async (id: number) => {
  try {
    const response = await api.delete(`/rutinas/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Error al eliminar rutina");
  }
};


export const asignarRutina = async (clienteId: number, rutinaId: number, entrenadorId?: number) => {
  try {
    const response = await api.post(`/rutinas/asignar`, {
      usuarioId: clienteId,
      rutinaId,
      entrenadorId,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || "Error al asignar rutina al cliente"
    );
  }
};
