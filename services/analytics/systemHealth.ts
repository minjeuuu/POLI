
export const measureLatency = async (url: string): Promise<number> => {
    const start = performance.now();
    try {
        await fetch(url, { method: 'HEAD', mode: 'no-cors' });
        return performance.now() - start;
    } catch (e) {
        return -1;
    }
};

export const reportError = (error: Error, context: string) => {
    console.error(`[System Health] Critical Error in ${context}:`, error);
    // In production, send to Sentry/LogRocket
};
