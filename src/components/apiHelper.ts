export const addAuthorizationHeader = (options: RequestInit, token: string) => {
    return {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${token}`
        }
    };
};

export const addJsonHeaders = (options: RequestInit) => {
    return {
        ...options,
        headers: {
            ...options.headers,
            'Content-Type': 'application/json'
        }
    };
};
