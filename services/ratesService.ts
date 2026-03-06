
import { generateWithFallback, cleanJson, withCache } from "./common";
import { ExchangeRate } from "../types";

export const fetchExchangeRates = async (): Promise<ExchangeRate[]> => {
    return withCache(`rates_v2_${new Date().getHours()}`, async () => { 
         try {
            const response = await generateWithFallback({ contents: `Generate a JSON array of major exchange rates relative to USD.
                JSON: [{currencyCode: string, currencyName: string, rate: number, symbol: string, category: 'Fiat' | 'Crypto' | 'Historical' | 'Fictional'}].
                Include major fiat, top 5 crypto.
                Note: This is a simulation.` });
            return JSON.parse(cleanJson(response.text || '[]')) as ExchangeRate[];
        } catch (e) { return []; }
    });
};

export const fetchCurrencyAnalysis = async (currency: string): Promise<{history: string, economics: string}> => {
    return withCache(`currency_analysis_pro_${currency}`, async () => {
        try {
            const response = await generateWithFallback({ contents: `Analyze currency: ${currency}. Provide detailed history and economic profile. JSON: {history: string, economics: string}.` });
            return JSON.parse(cleanJson(response.text || '{}'));
        } catch (e) { return { history: "Unavailable", economics: "Unavailable" }; }
    });
};
