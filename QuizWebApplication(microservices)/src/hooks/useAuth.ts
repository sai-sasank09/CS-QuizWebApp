import { create } from 'zustand';
import { authApi } from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const response = await authApi.login(email, password);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      set({ user, token, loading: false });
    } catch (error) {
      set({ error: 'Invalid credentials', loading: false });
      throw error;
    }
  },

  register: async (name: string, email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const response = await authApi.register(email, password, name);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      set({ user, token, loading: false });
    } catch (error) {
      set({ error: 'Registration failed', loading: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },
}));