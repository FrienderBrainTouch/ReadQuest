import { useState, useCallback, type ReactNode } from 'react';
import { MOCK_PASSWORD } from '../data/books';
import { AuthContext } from './authCore';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback((password: string) => {
    if (password === MOCK_PASSWORD) {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
