import { useCallback } from 'react';
import Cookies from 'js-cookie';

interface TokenService {
  getToken: () => string;
  setToken: (token: string) => void;
  clearTokens: () => void;
}

export const useTokenService = (): TokenService => {
  const getToken = useCallback((): string => {
    console.log("Cookies.get('token')", Cookies.get('token'));
    return Cookies.get('token') || '';
  }, []);

  const setToken = useCallback((token: string): void => {
    Cookies.set('token', token, {
      expires: 7,
      secure: true,
      sameSite: 'Strict',
    });
  }, []);

  const clearTokens = useCallback((): void => {
    Cookies.remove('token');
  }, []);

  return { getToken, setToken, clearTokens };
};
