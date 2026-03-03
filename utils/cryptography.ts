
export const hashString = async (message: string): Promise<string> => {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export const generateSessionId = (): string => {
    return 'sess_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
};

export const encryptLocalData = (data: string, key: string): string => {
    // Mock encryption for local storage
    return btoa(data + key); 
};
