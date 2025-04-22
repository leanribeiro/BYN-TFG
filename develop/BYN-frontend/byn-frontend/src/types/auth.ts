export type User = {
    id: number;
    name?: string;
    email: string;
    role: string;
  };
  
  export type AuthState = {
    token: string | null;
    user: User | null;
    roles: string;
    isLoading: boolean;
    error: string | null;
  
    login: (token: string, user: User) => void;
    logout: () => void;
    setLoading: (loading: boolean) => void;
    setError: (message: string | null) => void;
    updateUser: (newUser: Partial<User>) => void;
    hasRole: (role: string) => boolean;
  };