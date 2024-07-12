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

  const handleResponse = useCallback(
    async (response) => {
      if (!response.ok) {
        let errorMessage = 'network response was not ok';
        try {
          const errorBody = await response.json();
          errorMessage = errorBody.error || errorMessage;
        } catch (error) {
          console.error(error);
        }

        switch (response.status) {
          case 401:
            clearTokens();
            navigate('/login');
            errorMessage = 'Unauthorized: ' + errorMessage;
            break;
          case 404:
            errorMessage = 'Not Found: ' + errorMessage;
            break;
          case 500:
            errorMessage = 'Internal Server Error: ' + errorMessage;
            break;
          default:
            errorMessage = `[${response.status}] ${errorMessage}`;
            break;
        }
        throw new Error(errorMessage);
      }
      return response.json();
    },
    [clearTokens, navigate],
  );

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
        return handleResponse(response) as Promise<ResultType>;
      } catch (error) {
        if (error instanceof Error) {
          toast.error('Failed to fetch data: ' + error.message);
        }
        throw error;
      }
    },
    [getToken, handleResponse],
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

        return handleResponse(response) as Promise<ResultType>;
      } catch (error) {
        if (error instanceof Error) {
          toast.error('Failed to fetch data: ' + error.message);
        }
        throw error;
      }
    },
    [getToken, handleResponse],
  );

  return { sendGet, sendPost };
};
