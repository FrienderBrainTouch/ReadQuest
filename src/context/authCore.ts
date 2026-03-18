import { createContext } from 'react';

export interface AuthContextType {
  isLoggedIn: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

