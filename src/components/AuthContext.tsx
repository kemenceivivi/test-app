import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  FC,
} from 'react';
import { useTokenService } from './useTokenService';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({
  children,
}): JSX.Element => {
  const { getToken, clearTokens } = useTokenService();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = getToken();
    console.log('token on load:', token);
    setIsAuthenticated(!!token);
  }, [getToken]);

  const login = (): void => setIsAuthenticated(true);
  const logout = (): void => {
    setIsAuthenticated(false);
    clearTokens();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('');
  }
  return context;
};
