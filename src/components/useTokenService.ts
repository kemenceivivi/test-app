export const useTokenService = () => {
    const getToken = () => {











        return localStorage.getItem('token') || '';
    };

    const clearTokens = () => {
        localStorage.removeItem('token');
    };

    return { getToken, clearTokens };
};
