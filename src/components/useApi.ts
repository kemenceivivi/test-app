import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addAuthorizationHeader, addJsonHeaders } from './apiHelper';
import { useTokenService } from './useTokenService';

interface Api {
  sendGet: <ResultType>(
    url: string,
    options?: RequestInit,
  ) => Promise<ResultType>;
  sendPost: <RequestType, ResultType>(
    url: string,
    body: RequestType,
    options?: RequestInit,
  ) => Promise<ResultType>;
}

export const useApi = (): Api => {
  const navigate = useNavigate();
  const { getToken, clearTokens } = useTokenService();

  const sendGet = useCallback(
    async <ResultType>(
      url: string,
      options?: RequestInit,
    ): Promise<ResultType> => {
      try {
        const response = await fetch(
          url,
          addAuthorizationHeader(options || {}, getToken()),
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return (await response.json()) as ResultType;
      } catch (error) {
        if (error instanceof Error && error.message === 'Unauthorized') {
          clearTokens();
          navigate('/login');
        }
        toast.error('Failed to fetch data');
        throw error;
      }
    },
    [getToken, clearTokens, navigate],
  );

  const sendPost = useCallback(
    async <RequestType, ResultType>(
      url: string,
      body: RequestType,
      options?: RequestInit,
    ): Promise<ResultType> => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(body),
          ...addJsonHeaders(options || {}),
          ...addAuthorizationHeader(options || {}, getToken()),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return (await response.json()) as ResultType;
      } catch (error) {
        if (error instanceof Error && error.message === 'Unauthorized') {
          clearTokens();
          navigate('/login');
        }
        toast.error('Failed to fetch data');
        throw error;
      }
    },
    [getToken, clearTokens, navigate],
  );

  return { sendGet, sendPost };
};
