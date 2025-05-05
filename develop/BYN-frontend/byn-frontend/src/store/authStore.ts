import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthState } from "../types";

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      roles: [],
      isLoading: false,
      error: null,

      // Función para login
      login: (token, user) => {
        const rolesArray = Array.isArray(user.role) ? user.role : [user.role];
        set({
          token,
          user,
          roles: rolesArray,
          isLoading: false,
          error: null,
        });
      },

      // Función para logout
      logout: () => {
        console.log("Logout called"); // Agregar un console.log aquí
        set({
          token: null,  
          user: null,
          roles: [],
          isLoading: false,
          error: null,
        });
      },

      // Función para actualizar el estado de carga (por ejemplo, mientras se hace login)
      setLoading: (loading) => set({ isLoading: loading }),

      // Función para establecer errores (por ejemplo, errores al hacer login)
      setError: (message) => set({ error: message }),

      // Función para actualizar los datos del usuario
      updateUser: (newUser) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...newUser } : null,
        }));
      },

      // Función para verificar si el usuario tiene un rol específico
      hasRole: (role) => get().roles.includes(role),
    }),
    {
      name: "auth-storage", // Nombre para persistir en localStorage
    }
  )
);

export default useAuthStore;
