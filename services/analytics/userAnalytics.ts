
import { db } from "../database";

export const logPageView = async (page: string) => {
    console.debug(`[Analytics] Page View: ${page}`);
    await db.saveItem('history_logs', {
        date: new Date().toISOString(),
        action: 'PAGE_VIEW',
        details: page
    });
};

export const logInteraction = async (elementId: string, type: 'click' | 'hover' | 'submit') => {
    // Debounce high frequency events in real implementation
    console.debug(`[Analytics] Interaction: ${type} on ${elementId}`);
};
