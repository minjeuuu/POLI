
export const logRequest = (url: string, options: any) => {
    console.debug(`[API] ${options?.method || 'GET'} ${url}`);
};

export const handleNetworkError = (error: any) => {
    console.error(`[Network Error]`, error);
    // In a real app, dispatch to global error handler
};
